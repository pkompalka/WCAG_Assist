using Microsoft.EntityFrameworkCore;
using mgrAPI.Models;

namespace mgrAPI.Data_Access_Layer
{
    public class PictureContext : DbContext
    {
        public PictureContext(DbContextOptions<PictureContext> options) : base(options)
        {

        }
        public DbSet<Picture> Picture { get; set; }
    }
}
