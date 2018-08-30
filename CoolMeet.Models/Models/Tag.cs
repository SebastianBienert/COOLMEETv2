using System;
using System.Collections.Generic;
using System.Text;
using CoolMeet.Models.Interfaces;

namespace CoolMeet.Models.Models
{
    public class Tag : IBase
    {
        public int Id { get; set; }

        public DateTime Created { get; set; }

        public string Name { get; set; }

        public ICollection<TagEvent> TagEvents { get; set; }
    }
}
