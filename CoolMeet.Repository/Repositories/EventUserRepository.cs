using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CoolMeet.Models.Models;
using CoolMeet.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoolMeet.Repository.Repositories
{
    public class EventUserRepository : IEventUserRepository
    {
        private readonly Context _context;

        public EventUserRepository(Context context)
        {
            _context = context;
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


        public async Task<bool> DeleteEventUser(string userId,int eventId)
        {
            var entityToDelete = await _context.EventUsers.SingleOrDefaultAsync(x => (x.UserId == userId) && (x.EventId == eventId));
            if (entityToDelete == null)
            {
                return false;
            }

            _context.EventUsers.Remove(entityToDelete);
            await _context.SaveChangesAsync();
            return true;
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