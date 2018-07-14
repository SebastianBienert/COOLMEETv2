using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CoolMeet.BL.Interfaces;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Models;
using CoolMeet.Repository;
using CoolMeet.Repository.Interfaces;

namespace CoolMeet.BL.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;

        private readonly IMapper _mapper;

        public EventService(IEventRepository repository, IMapper mapper)
        {
            _eventRepository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<EventDTO>> GetAllEvents()
        {
            var events = await _eventRepository.GetAllEvents();
            return _mapper.Map<IEnumerable<EventDTO>>(events);
        }

        public async Task<EventDTO> GetEvent(int id)
        {
            var eventEnitty = await _eventRepository.GetEvent(id);
            return _mapper.Map<EventDTO>(eventEnitty);
        }

        public async Task<EventDTO> AddEvent(AddEventDTO eventDto)
        {
            var eventEntity = _mapper.Map<Event>(eventDto);
            var result = await _eventRepository.AddEvent(eventEntity);
            return _mapper.Map<EventDTO>(result);
        }

        public async Task<bool> DeleteEvent(int id)
        {
            return await _eventRepository.DeleteEvent(id);
        }

        public async Task<IEnumerable<EventDTO>> GetLoggedUserEvents(string id)
        {
            var events = await _eventRepository.GetLoggedUserEvents(id);
            return _mapper.Map<IEnumerable<EventDTO>>(events);
        }

        public async Task<EventDTO> UpdateEvent(AddEventDTO eventDto)
        {
            var eventEntity = _mapper.Map<Event>(eventDto);
            var result = await _eventRepository.UpdateEvent(eventEntity);
            return _mapper.Map<EventDTO>(result);
        }
    }
}