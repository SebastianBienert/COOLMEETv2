using System;
using System.Collections.Generic;

namespace CoolMeet.Models.Dtos
{
    public class EventDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string Address { get; set; }

        public StatusDto Status { get; set; }

        public IEnumerable<UserShortDTO> Users { get; set; }

        public IEnumerable<UserShortDTO> Administrators { get; set; }

        public IEnumerable<TagDTO> Tags { get; set; }

        public IEnumerable<CommentDTO> Comments { get; set; }
    }
}