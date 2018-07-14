using CoolMeet.Models.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoolMeet.Repository.Interfaces
{
    public interface IStatusRepository
    {
        Task<IList<Status>> GetStatuses();
    }
}
