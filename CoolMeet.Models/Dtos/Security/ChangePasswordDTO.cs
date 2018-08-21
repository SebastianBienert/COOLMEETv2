using System;
using System.Collections.Generic;
using System.Text;

namespace CoolMeet.Models.Dtos.Security
{
    public class ChangePasswordDTO
    {
        public string NewPassword { get; set; }

        public string NewPasswordConfirmation { get; set; }

        public string OldPassword { get; set; }
    }
}
