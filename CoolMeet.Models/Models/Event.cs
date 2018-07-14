using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using CoolMeet.Models.Interfaces;

namespace CoolMeet.Models.Models
{
    public class Event : IBase
    {
        [Key]
        public int Id { get; set; }

        public DateTime Created { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        public int StatusId { get; set; }

        public virtual Status Status { get; set; }

        public virtual ICollection<EventUser> Users { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}