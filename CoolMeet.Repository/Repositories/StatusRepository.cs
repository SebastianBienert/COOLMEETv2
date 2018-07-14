using CoolMeet.Models.Models;
using CoolMeet.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoolMeet.Repository.Repositories
{
    public class StatusRepository : IStatusRepository
    {
        private readonly Context _context;

        public StatusRepository(Context context)
        {
            _context = context;
        }

        public async Task<IList<Status>> GetStatuses()
        {
            return await _context.Statuses.ToListAsync();
        }
    }
}
