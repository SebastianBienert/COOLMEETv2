using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CoolMeet.Models.Dtos
{
    public class RegistrationDTO
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string UserName { get; set; }

        public string Password { get; set; }
    }
}
