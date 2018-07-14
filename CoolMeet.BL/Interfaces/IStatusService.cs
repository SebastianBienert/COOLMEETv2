using CoolMeet.Models.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoolMeet.BL.Interfaces
{
    public interface IStatusService
    {
        Task<IList<StatusDto>> GetStatuses();
    }
}
