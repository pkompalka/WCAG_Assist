using Microsoft.EntityFrameworkCore;
using mgrAPI.Models;

namespace mgrAPI.Data_Access_Layer
{
    public class AuctionBuyerContext : DbContext
    {
        public AuctionBuyerContext(DbContextOptions<AuctionBuyerContext> options) : base(options)
        {

        }
        public DbSet<AuctionBuyer> AuctionBuyer { get; set; }
    }
}
