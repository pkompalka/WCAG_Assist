using Microsoft.EntityFrameworkCore;
using mgrAPI.Models;

namespace mgrAPI.Data_Access_Layer
{
    public class CategoryContext : DbContext
    {
        public CategoryContext(DbContextOptions<CategoryContext> options) : base(options)
        {

        }
        public DbSet<Category> Category { get; set; }
    }
}
