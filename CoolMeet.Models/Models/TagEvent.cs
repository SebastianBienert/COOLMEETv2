using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using CoolMeet.Models.Interfaces;

namespace CoolMeet.Models.Models
{
    public class TagEvent
    {
        public DateTime Created { get; set; }

        [Required]
        public int EventId { get; set; }

        public Event Event { get; set; }

        [Required]
        public int TagId { get; set; }

        public Tag Tag { get; set; }

    }
}
