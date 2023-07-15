using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mgrAPI.Models
{
    public class AuctionBuyer
    {
        [Key]
        public int ID { get; set; }

        [Column(TypeName = "int32")]
        public int AuctionID { get; set; }

        [Column(TypeName = "int32")]
        public int UserID { get; set; }
    }
}
