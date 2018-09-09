using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Models;

namespace CoolMeet.BL.Interfaces
{
    public interface IEventService
    {
        Task<IEnumerable<EventDTO>> GetAllEvents();

        Task<IEnumerable<EventDTO>> GetEventsByTag(string tag);

        Task<EventDTO> GetEvent(int id);

        Task<EventDTO> AddEvent(AddEventDTO eventDto);

        Task<bool> DeleteEvent(int id);

        Task<IEnumerable<EventDTO>> GetLoggedUserEvents(string id);

        Task<EventDTO> UpdateEvent(AddEventDTO eventDto);

        Task<JoinEventDTO> AddUserToEvent(JoinEventDTO joinEventDto);

        Task<IEnumerable<UserDto>> GetAdministrators(int eventId);

        Task<EventDTO> DeleteUserFromEvent(string userId, int eventId);

        Task<EventDTO> AssignAdministratorRights(string userId, int eventId);

        Task<JoinEventDTO> GetEventUserEntity(int id);

        Task<IEnumerable<TagDTO>> UpdateTags(int eventId, List<TagDTO> tagDtos);
    }
}
