using System;
using System.Collections.Generic;
using System.Text;

namespace CoolMeet.Models.Dtos.Security
{
    public class TokenDto
    {
        public string Token { get; set; }

        public UserDto UserInformation { get; set; }
    }
}
