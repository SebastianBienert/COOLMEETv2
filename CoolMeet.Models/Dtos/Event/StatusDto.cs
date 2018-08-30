using System.ComponentModel.DataAnnotations;

namespace CoolMeet.Models.Dtos
{
    public class StatusDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
