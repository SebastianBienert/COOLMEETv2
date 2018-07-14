using System;
using System.ComponentModel.DataAnnotations;
using CoolMeet.Models.Interfaces;


namespace CoolMeet.Models.Models
{
    public class EventUser : IBase
    {
        [Key]
        public int Id { get; set; }

        public DateTime Created { get; set; }

        [Required]
        public string UserType { get; set; }

        public int EventId { get; set; }

        public Event Event { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }
    }
}
