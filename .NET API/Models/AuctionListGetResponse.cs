namespace mgrAPI.Models
{
    public class AuctionListGetResponse
    {
        public int ID { get; set; } 
        public string Title { get; set; }
        public float Price { get; set; }
        public DateTime EndDate { get; set; }
        public string CategoryName { get; set; }
        public string Image { get; set; }
    }
}
