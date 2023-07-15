using Microsoft.EntityFrameworkCore;
using mgrAPI.Models;

namespace mgrAPI.Data_Access_Layer
{
    public class AuctionContext : DbContext
    {
        public AuctionContext(DbContextOptions<AuctionContext> options) : base(options)
        {

        }
        public DbSet<Auction> Auction { get; set; }
    }
}
