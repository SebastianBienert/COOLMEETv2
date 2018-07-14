using CoolMeet.Models.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;

namespace CoolMeet.Models.Models
{
    public class Comment : IBase
    {
        [Key]
        public int Id { get; set; }
        public DateTime Created { get; set; }
        [Required]
        public int EventId { get; set; }
        [Required]
        public string UserId { get; set; }
        public virtual Event Event { get; set; }
        public virtual User User { get; set; }
        public string Text { get; set; }
    }
}