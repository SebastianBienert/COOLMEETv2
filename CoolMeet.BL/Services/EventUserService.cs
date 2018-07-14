using AutoMapper;
using CoolMeet.BL.Interfaces;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Models;
using CoolMeet.Repository.Interfaces;
using System.Threading.Tasks;

namespace CoolMeet.BL.Services
{
    public class EventUserService : IEventUserService
    {
        private readonly IEventUserRepository _repository;

        private readonly IMapper _mapper;

        public EventUserService(IEventUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<JoinEventDTO> AddUserToEvent(JoinEventDTO joinEventDto)
        {
            var eventUserEntity = _mapper.Map<EventUser>(joinEventDto);

            return _mapper.Map<JoinEventDTO>(await _repository.AddEventUser(eventUserEntity));
        }

        public async Task<bool> LeaveUserFromEvent(string userId, int eventId)
        {
            return await _repository.DeleteEventUser(userId, eventId);
        }


        public async Task<JoinEventDTO> GetEventUserEntity(int id)
        {
            var entity = await _repository.GetEventUser(id);
            return _mapper.Map<JoinEventDTO>(entity);
        }
    }
}