using System.ComponentModel.DataAnnotations;

namespace CoolMeet.Models.Models
{
    public class Status
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
