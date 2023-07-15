using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mgrAPI.Models
{
    public class Picture
    {
        [Key]
        public int ID { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string PictureBase64 { get; set; }

    }
}
