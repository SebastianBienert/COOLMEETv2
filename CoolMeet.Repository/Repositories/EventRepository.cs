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
            return await _context.Events.Include(e => e.Users).ThenInclude(eu => eu.User).Include(s => s.Status).Include(c => c.Comments)
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetLoggedUserEvents(string id)
        {
            var result = await _context.Events
                .Include(e => e.Users).ThenInclude(eu => eu.User)
                .Include(s => s.Status)
                .Include(c => c.Comments)
                .Where(u => u.Users.Any(ue => ue.UserId == id))
                .ToListAsync();

            return result;
        }

        public async Task<Event> GetEvent(int id)
        {
            return await _context.Events.Where(e => e.Id == id).Include(e => e.Users).ThenInclude(eu => eu.User)
                .Include(c => c.Comments).ThenInclude(eu => eu.User)
                .Include(s => s.Status)
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
    }
}