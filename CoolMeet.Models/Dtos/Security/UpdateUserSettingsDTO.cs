using System;
using System.Collections.Generic;
using System.Text;

namespace CoolMeet.Models.Dtos.Security
{
    public class UpdateUserSettingsDTO
    {
        public bool AllowBrowsingEvents { get; set; }

        public bool AllowShowingProfile { get; set; }
    }
}
