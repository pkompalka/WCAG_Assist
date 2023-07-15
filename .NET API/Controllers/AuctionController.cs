using mgrAPI.Data_Access_Layer;
using mgrAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace mgrAPI.Controllers
{
    [Route("api/auction")]
    [ApiController]
    public class AuctionController : ControllerBase
    {
        private AuctionContext auctionContext;
        private AuctionBuyerContext auctionBuyerContext;
        private PictureContext pictureContext;
        private UserContext userContext;

        public AuctionController(AuctionContext auctionContext, AuctionBuyerContext auctionBuyerContext, PictureContext pictureContext, UserContext userContext)
        {
            this.auctionContext = auctionContext;
            this.auctionBuyerContext = auctionBuyerContext;
            this.pictureContext = pictureContext;
            this.userContext = userContext;
        }

        [HttpGet("auction/{id}")]
        public async Task<ActionResult<AuctionGetResponse>> GetAuctionFromID(int id)
        {
            try
            {
                List<Auction> auctionList = await auctionContext.Auction.ToListAsync();
                Auction auctionToReturn = auctionList.Find(x => x.ID == id);

                List<Picture> pictureList = await pictureContext.Picture.ToListAsync();
                string pictureBase64 = pictureList.Find(x => x.ID == auctionToReturn.PictureID).PictureBase64;

                List<User> userList = await userContext.User.ToListAsync();
                string seller = userList.Find(x => x.ID == auctionToReturn.UserID).Login;

                AuctionGetResponse auctionResponse = new AuctionGetResponse()
                {
                    ID = auctionToReturn.ID,
                    Title = auctionToReturn.Title,
                    Description = auctionToReturn.Description,
                    Price = auctionToReturn.Price,
                    Quantity = auctionToReturn.Quantity,
                    StartDate = auctionToReturn.StartDate,
                    EndDate = auctionToReturn.EndDate,
                    CategoryName = auctionToReturn.Category,
                    Image = pictureBase64,
                    SellerLogin = seller
                };
                return Ok(auctionResponse);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("category/{category}")]
        public async Task<ActionResult<IEnumerable<AuctionListGetResponse>>> GetAuctionFromCategory(string category)
        {
            try
            {
                List<Auction> auctionList = await auctionContext.Auction.ToListAsync();
                List<Auction> auctionListFiltered = auctionList.FindAll(x => x.Category == category && x.IsClosed == false);
                List<AuctionListGetResponse> auctionListResponseList = await GetAuctionListToResponse(auctionListFiltered);
                return Ok(auctionListResponseList);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("search/{word}")]
        public async Task<ActionResult<IEnumerable<AuctionListGetResponse>>> GetAuctionFromWord(string word)
        {
            try
            {
                List<Auction> auctionList = await auctionContext.Auction.ToListAsync();
                List<Auction> auctionListFiltered = auctionList.FindAll(x => x.Title.IndexOf(word, StringComparison.OrdinalIgnoreCase) >= 0 && x.IsClosed == false);
                List<AuctionListGetResponse> auctionListResponseList = await GetAuctionListToResponse(auctionListFiltered);
                return Ok(auctionListResponseList);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("selling/{id}")]
        public async Task<ActionResult<IEnumerable<AuctionListGetResponse>>> GetSellingAuctions(int id)
        {
            try
            {
                List<Auction> auctionList = await auctionContext.Auction.ToListAsync();
                List<Auction> auctionListFiltered = auctionList.FindAll(x => x.UserID == id && x.IsClosed == false);
                List<AuctionListGetResponse> auctionListResponseList = await GetAuctionListToResponse(auctionListFiltered);
                return Ok(auctionListResponseList);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("bought/{id}")]
        public async Task<ActionResult<IEnumerable<AuctionListGetResponse>>> GetBoughtAuctions(int id)
        {
            try
            {
                List<AuctionBuyer> auctionBuyerList = await auctionBuyerContext.AuctionBuyer.ToListAsync();
                List<AuctionBuyer> auctionBuyerFiltered = auctionBuyerList.FindAll(x => x.UserID == id);
                List<Auction> auctionList = await auctionContext.Auction.ToListAsync();
                List<Picture> pictureList = await pictureContext.Picture.ToListAsync();
                List<AuctionListGetResponse> auctionListResponseToSend = new List<AuctionListGetResponse>();
                foreach (AuctionBuyer auctionBuyer in auctionBuyerFiltered)
                {
                    Auction auction = auctionList.Find(x => x.ID == auctionBuyer.AuctionID);
                    string pictureBase64 = pictureList.Find(x => x.ID == auction.PictureID).PictureBase64;
                    AuctionListGetResponse auctionGetResponse = new AuctionListGetResponse()
                    {
                        ID = auction.ID,
                        Title = auction.Title,
                        Price = auction.Price,
                        EndDate = auction.EndDate,
                        CategoryName = auction.Category,
                        Image = pictureBase64
                    };
                    auctionListResponseToSend.Add(auctionGetResponse);
                }
                return Ok(auctionListResponseToSend);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost("buy")]
        public async Task<ActionResult> BuyAuction([FromBody] AuctionBuyRequest auctionBuyRequest)
        {
            try
            {
                List<Auction> auctionList = await auctionContext.Auction.ToListAsync();
                Auction auctionToBuy = auctionList.Find(x => x.ID == auctionBuyRequest.AuctionID);

                int idToAdd = (int)(from n in auctionBuyerContext.AuctionBuyer orderby n.ID descending select n.ID).FirstOrDefault();
                idToAdd++;
                AuctionBuyer auctionBuyerToAdd = new AuctionBuyer()
                {
                    ID = idToAdd,
                    AuctionID = auctionToBuy.ID,
                    UserID = auctionBuyRequest.UserID,
                };
                auctionBuyerContext.AuctionBuyer.Add(auctionBuyerToAdd);
                auctionBuyerContext.SaveChanges();

                auctionToBuy.Quantity--;
                if(auctionToBuy.Quantity < 1)
                    auctionToBuy.IsClosed = true;
                auctionContext.SaveChanges();

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddAuction([FromBody] AuctionCreateRequest auctionCreateRequest)
        {
            try
            {
                List<Picture> pictureList = await pictureContext.Picture.ToListAsync();
                int pictureId = (int)(from n in pictureContext.Picture orderby n.ID descending select n.ID).FirstOrDefault();
                pictureId++;
                Picture pictureToAdd = new Picture()
                {
                    ID = pictureId,
                    PictureBase64 = auctionCreateRequest.Image
                };
                pictureContext.Picture.Add(pictureToAdd);
                pictureContext.SaveChanges();

                int idToAdd = (int)(from n in auctionContext.Auction orderby n.ID descending select n.ID).FirstOrDefault();
                idToAdd++;
                Auction auctionToAdd = new Auction()
                {
                    ID = idToAdd,
                    Title = auctionCreateRequest.Title,
                    Description = auctionCreateRequest.Description,
                    Price = auctionCreateRequest.Price,
                    Quantity = auctionCreateRequest.Quantity,
                    Category = auctionCreateRequest.CategoryName,
                    StartDate = auctionCreateRequest.StartDate,
                    EndDate = auctionCreateRequest.EndDate,
                    PictureID = pictureId,
                    UserID = auctionCreateRequest.UserID,
                    IsClosed = false
                };
                auctionContext.Auction.Add(auctionToAdd);
                auctionContext.SaveChanges();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        private async Task<List<AuctionListGetResponse>> GetAuctionListToResponse(List<Auction> auctionListFiltered)
        {
            List<User> userList = await userContext.User.ToListAsync();
            List<Picture> pictureList = await pictureContext.Picture.ToListAsync();
            List<AuctionListGetResponse> auctionListResponseToSend = new List<AuctionListGetResponse>();
            foreach (Auction auction in auctionListFiltered)
            {
                string seller = userList.Find(x => x.ID == auction.UserID).Login;
                string pictureBase64 = pictureList.Find(x => x.ID == auction.PictureID).PictureBase64;
                AuctionListGetResponse auctionGetResponse = new AuctionListGetResponse()
                {
                    ID = auction.ID,
                    Title = auction.Title,
                    Price = auction.Price,
                    EndDate = auction.EndDate,
                    CategoryName = auction.Category,
                    Image = pictureBase64
                };
                auctionListResponseToSend.Add(auctionGetResponse);
            }
            return auctionListResponseToSend;
        }
    }
}
