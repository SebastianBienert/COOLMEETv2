using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace CoolMeet.Models.Models
{
    public class User : IdentityUser
    {
        public DateTime Created { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PhotoPath { get; set; }

        public bool AllowBrowsingEvents { get; set; }

        public bool AllowShowingProfile { get; set; }

        public virtual ICollection<EventUser> Events { get; set; }
    }
}
