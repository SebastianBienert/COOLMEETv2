using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CoolMeet.Models.Models;

namespace CoolMeet.Repository.Interfaces
{
    public interface IEventUserRepository
    {
        Task<IEnumerable<EventUser>> GetAllEventUsers();

        Task<EventUser> GetEventUser(int id);

        Task<EventUser> AddEventUser(EventUser eventUser);

        Task<bool> DeleteEventUser(string userId, int eventId);

        Task<bool> UpdateEventUser(EventUser eventUser);
    }
}
