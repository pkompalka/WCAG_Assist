using Microsoft.EntityFrameworkCore;
using mgrAPI.Models;

namespace mgrAPI.Data_Access_Layer
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {

        }
        public DbSet<User> User { get; set; }
    }
}
