using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CoolMeet.Models.Models;

namespace CoolMeet.Repository.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAllEvents();

        Task<Event> GetEvent(int id);

        Task<Event> AddEvent(Event eventEntity);

        Task<bool> DeleteEvent(int id);

        Task<Event> UpdateEvent(Event eventEntity);

        Task<IEnumerable<Event>> GetLoggedUserEvents(string id);
    }
}
