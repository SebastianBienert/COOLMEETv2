using AutoMapper;
using CoolMeet.BL.Interfaces;
using CoolMeet.Models.Dtos;
using CoolMeet.Repository.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoolMeet.BL.Services
{
    public class StatusService : IStatusService
    {
        private readonly IStatusRepository _statusRepository;
        private readonly IMapper _mapper;

        public StatusService(IStatusRepository statusRepository, IMapper mapper)
        {
            _statusRepository = statusRepository;
            _mapper = mapper;
        }
        public async Task<IList<StatusDto>> GetStatuses()
        {
            var statuses = _mapper.Map<List<StatusDto>>( await _statusRepository.GetStatuses());

            return statuses;
        }
    }
}
