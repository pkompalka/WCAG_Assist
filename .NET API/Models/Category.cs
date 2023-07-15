using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace mgrAPI.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string Name { get; set; }

        [Column(TypeName = "boolean")]
        public bool IsSub { get; set; }

        [Column(TypeName = "int32")]
        public int? MasterId { get; set; }

    }
}
