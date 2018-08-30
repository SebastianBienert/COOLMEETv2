using System;
using System.Collections.Generic;
using System.IO.Compression;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoolMeet.Models.Models;
using CoolMeet.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoolMeet.Repository.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly Context _context;

        public EventRepository(Context context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Event>> GetAllEvents()
        {
            return await _context.Events
                .Include(e => e.Users).ThenInclude(eu => eu.User)
                .Include(s => s.Status)
                .Include(c => c.Comments)
                .Include(e => e.TagEvents).ThenInclude(te => te.Tag)
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetLoggedUserEvents(string id)
        {
            var result = await _context.Events
                .Include(e => e.Users).ThenInclude(eu => eu.User)
                .Include(s => s.Status)
                .Include(c => c.Comments)
                .Include(e => e.TagEvents).ThenInclude(te => te.Tag)
                .Where(u => u.Users.Any(ue => ue.UserId == id))
                .ToListAsync();

            return result;
        }

        public async Task<Event> GetEvent(int id)
        {
            return await _context.Events.Where(e => e.Id == id).Include(e => e.Users).ThenInclude(eu => eu.User)
                .Include(c => c.Comments).ThenInclude(eu => eu.User)
                .Include(s => s.Status)
                .Include(e => e.TagEvents).ThenInclude(te => te.Tag)
                .SingleOrDefaultAsync();
        }

        public async Task<Event> AddEvent(Event eventEntity)
        {
            eventEntity.Created = DateTime.Now;
            eventEntity.Status = await _context.Statuses.SingleOrDefaultAsync(e => e.Id == eventEntity.StatusId);

            await _context.Events.AddAsync(eventEntity);
            await _context.SaveChangesAsync();
            return eventEntity;
        }

        public async Task<bool> DeleteEvent(int id)
        {
            var eventToDelete = _context.Events.SingleOrDefault(x => x.Id == id);
            var eventUsersToDelete = _context.EventUsers.Where(x => x.EventId == id);

            if (eventToDelete == null)
            {
                return false;
            }

            _context.EventUsers.RemoveRange(eventUsersToDelete);
            await _context.SaveChangesAsync();

            _context.Events.Remove(eventToDelete);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Event> UpdateEvent(Event eventEntity)
        {
            var entityToUpdate = await _context.Events.Include(e => e.Users).ThenInclude(eu => eu.User)
                .SingleOrDefaultAsync(e => e.Id == eventEntity.Id);
            if (entityToUpdate != null)
            {
                entityToUpdate.Address = eventEntity.Address;
                entityToUpdate.City = eventEntity.City;
                entityToUpdate.Country = eventEntity.Country;
                entityToUpdate.Description = eventEntity.Description;
                entityToUpdate.StatusId = eventEntity.StatusId;
                entityToUpdate.StartDate = eventEntity.StartDate;
                entityToUpdate.EndDate = eventEntity.EndDate;
                await _context.SaveChangesAsync();
                return entityToUpdate;
            }

            return null;
        }

        public async Task<IEnumerable<EventUser>> GetAllEventUsers()
        {
            return await _context.EventUsers.Include(eu => eu.User)
                .Include(eu => eu.Event).ToListAsync();
        }

        public async Task<EventUser> GetEventUser(int id)
        {
            return await _context.EventUsers.Include(eu => eu.User)
                .Include(eu => eu.Event).SingleOrDefaultAsync(eu => eu.Id == id);
        }

        public async Task<EventUser> AddEventUser(EventUser eventUser)
        {
            if (_context.EventUsers.Any(x => x.UserId == eventUser.UserId && x.EventId == eventUser.EventId))
            {
                return null;
            }
            eventUser.Created = DateTime.Now;
            eventUser.Event = await _context.Events.SingleOrDefaultAsync(e => e.Id == eventUser.EventId);
            eventUser.User = await _context.Users.SingleOrDefaultAsync(u => u.Id == eventUser.UserId);
            await _context.EventUsers.AddAsync(eventUser);
            await _context.SaveChangesAsync();
            return eventUser;
        }


        public async Task<Event> DeleteEventUser(string userId, int eventId)
        {
            var entityToDelete = await _context.EventUsers.SingleOrDefaultAsync(x => (x.UserId == userId) && (x.EventId == eventId));
            if (entityToDelete == null)
            {
                return null;
            }
            _context.EventUsers.Remove(entityToDelete);
            await _context.SaveChangesAsync();
            return await GetEvent(eventId);
        }

        public async Task<IEnumerable<User>> GetAdministrators(int eventId)
        {
            var admins = await _context.EventUsers
                            .Where(eu => eu.EventId == eventId && eu.UserType == "Administrator")
                            .Select(eu => eu.User)
                            .ToArrayAsync();
            return admins;
        }

        public async Task<Event> AssignAdministratorRights(string userId, int eventId)
        {
            var entityToUpdate = await _context.EventUsers.FirstOrDefaultAsync(eu => eu.EventId == eventId && eu.UserId == userId);
            if (entityToUpdate != null)
            {
                entityToUpdate.UserType = "Administrator";
                await _context.SaveChangesAsync();
                return await GetEvent(eventId);
            }

            return null;
        }

        public async Task<bool> UpdateEventUser(EventUser eventUser)
        {
            var entityToUpdate = await _context.EventUsers.Include(eu => eu.User).Include(eu => eu.Event).
                SingleOrDefaultAsync(e => e.Id == eventUser.Id);
            if (entityToUpdate != null)
            {
                _context.Entry(entityToUpdate).CurrentValues.SetValues(entityToUpdate);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}