using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mgrAPI.Models
{
    public class Auction
    {
        [Key]
        public int ID { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string Title { get; set; }

        [Column(TypeName = "nvarchar(500)")]
        public string Description { get; set; }

        [Column(TypeName = "float")]
        public float Price { get; set; }

        [Column(TypeName = "int32")]
        public int Quantity { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string Category { get; set; }

        [Column(TypeName = "DateTime")]
        public DateTime StartDate { get; set; }

        [Column(TypeName = "DateTime")]
        public DateTime EndDate { get; set; }

        [Column(TypeName = "int32")]
        public int PictureID { get; set; }

        [Column(TypeName = "int32")]
        public int UserID { get; set; }

        [Column(TypeName = "boolean")]
        public bool IsClosed { get; set; }
    }
}
