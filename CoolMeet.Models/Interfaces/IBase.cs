using System;

namespace CoolMeet.Models.Interfaces
{
    public interface IBase
    {
        int Id { get; set; }

        DateTime Created { get; set; }

    }
}