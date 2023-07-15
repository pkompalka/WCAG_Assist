using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mgrAPI.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string Login { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string Password { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string Surname { get; set; }

        [Column(TypeName = "nvarchar(40)")]
        public string Street { get; set; }

        [Column(TypeName = "nvarchar(6)")]
        public string Postcode { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string City { get; set; }
    }
}
