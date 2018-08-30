using System;
using System.Collections.Generic;

namespace CoolMeet.Models.Dtos
{
    public class AddEventDTO
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public string Address { get; set; }

        public int StatusID { get; set; }

        public IEnumerable<string> Users { get; set; }
    }
}
