using System;
using System.Collections.Generic;
using System.Text;

namespace CoolMeet.Models.Dtos
{
    public class JoinEventDTO
    {
        public int Id { get; set; }

        public int EventId { get; set; }

        public string UserId { get; set; }

        public string UserType { get; set; }
    }
}
