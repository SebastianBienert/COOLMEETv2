using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Models;

namespace CoolMeet.BL.Interfaces
{
    public interface IEventUserService
    {
        Task<JoinEventDTO> AddUserToEvent(JoinEventDTO joinEventDto);

        Task<bool> LeaveUserFromEvent(string userId, int eventId);

        Task<JoinEventDTO> GetEventUserEntity(int id);
    }
}