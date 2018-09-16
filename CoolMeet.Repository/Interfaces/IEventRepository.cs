using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Models;

namespace CoolMeet.Repository.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAllEvents();

        Task<IEnumerable<Event>> GetEventsByTag(string tag);

        Task<Event> GetEvent(int id);

        Task<Event> AddEvent(Event eventEntity);

        Task<bool> DeleteEvent(int id);

        Task<Event> UpdateEvent(Event eventEntity);

        Task<IEnumerable<Event>> GetUserEvents(string id);

        Task<IEnumerable<EventUser>> GetAllEventUsers();

        Task<EventUser> GetEventUser(int id);

        Task<EventUser> AddEventUser(EventUser eventUser);

        Task<Event> DeleteEventUser(string userId, int eventId);

        Task<IEnumerable<User>> GetAdministrators(int eventId);

        Task<Event> AssignAdministratorRights(string userId, int eventId);

        Task<bool> UpdateEventUser(EventUser eventUser);

        Task<IEnumerable<TagEvent>> UpdateTags(int eventId, List<TagDTO> tagDtos);
    }
}
