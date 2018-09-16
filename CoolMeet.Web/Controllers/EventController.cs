using System.Collections.Generic;
using System.Linq;
using CoolMeet.BL.Interfaces;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace CoolMeet.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Event")]
    //[Authorize]
    public class EventController : BaseController
    {
        private readonly IEventService _eventService;

        private readonly IStatusService _statusService;

        private readonly UserManager<User> _userManager;

        public EventController(IEventService eventService,
            IStatusService statusService, UserManager<User> userManager)
        {
            _eventService = eventService;
            _statusService = statusService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents([FromQuery] string tag = null)
        {
            IEnumerable<EventDTO> events;
            if (tag == null)
                events = await _eventService.GetAllEvents();
            else
                events = await _eventService.GetEventsByTag(tag);

            if (events != null)
                return Ok(events);

            return NotFound();
        }

        [HttpGet("GetLoggedUserEvents", Name = "GetLoggedUserEvents")]
        public async Task<IActionResult> GetLoggedUserEvents()
        {
            User user = await GetCurrentUserAsync();
            var events = await _eventService.GetUserEvents(user.Id);

            if (events != null)
                return Ok(events);

            return NotFound();
        }


        [HttpGet("{id}", Name = "GetEventById")]
        public async Task<IActionResult> GetEvent(int id)
        {
            var eventDto = await _eventService.GetEvent(id);
            if (eventDto != null)
            {
                return Ok(eventDto);
            }

            return NotFound();
        }

        [HttpGet("roles/{id}", Name = "GetEventRoleById")]
        public async Task<IActionResult> GetEventUser(int id)
        {
            var dto = await _eventService.GetEventUserEntity(id);
            if (dto != null)
            {
                return Ok(dto);
            }

            return NotFound();
        }


        [HttpGet("status")]
        public async Task<IActionResult> GetStatuses()
        {
            var statuses = await _statusService.GetStatuses();
            if (statuses != null && statuses.Count > 0)
            {
                return Ok(statuses);
            }

            return NotFound();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            if (await _eventService.DeleteEvent(id))
            {
                return Ok();
            }

            return NotFound();
        }

        [HttpDelete("{eventId}/user/{userId}")]
        public async Task<IActionResult> DeleteUserFromEvent(int eventId, string userId)
        {
            var requestingUser = await GetCurrentUserAsync();
            if ((await _eventService.GetAdministrators(eventId)).All(a => a.Id != requestingUser.Id))
            {
                return Unauthorized();
            }
            var dto = await _eventService.DeleteUserFromEvent(userId, eventId);
            if(dto != null)
            {
                return Ok(dto);
            }
            return NotFound();
        }

        [HttpPatch("{eventId}/user/{userId}")]
        public async Task<IActionResult> AssignAdministratorRights(int eventId, string userId)
        {
            var requestingUser = await GetCurrentUserAsync();
            if ((await _eventService.GetAdministrators(eventId)).All(a => a.Id != requestingUser.Id))
            {
                return Unauthorized();
            }

            var dto = await _eventService.AssignAdministratorRights(userId, eventId);
            if (dto != null)
            {
                return Ok(dto);
            }
            return NotFound();
        }

        [HttpPost("join/{eventId}")]
        public async Task<IActionResult> AddUserToEvent(int eventId)
        {
            User user = await GetCurrentUserAsync();

            var addEventUser = await _eventService.AddUserToEvent(
                new JoinEventDTO
                {
                    EventId = eventId,
                    UserId = user.Id,
                    UserType = "Uczestnik"
                });

            if (addEventUser != null)
            {
                return CreatedAtRoute("GetEventRoleById", new {id = addEventUser.Id},
                    new {id = user.Id, name = $"{user.FirstName} {user.LastName}"});
            }
            return BadRequest();
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> EditEvent([FromBody] AddEventDTO eventDto, int id)
        {
            var editedDto = await _eventService.UpdateEvent(eventDto);

            if (editedDto != null)
            {
                return Ok(editedDto);
            }
            return BadRequest();
        }

        [HttpPatch("{id}/tags")]
        public async Task<IActionResult> EditEventTags(int id, [FromBody] List<TagDTO> tagDtos)
        {
            var editedTags = await _eventService.UpdateTags(id, tagDtos);
            if (editedTags != null)
            {
                return Ok(editedTags);
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<IActionResult> AddEvent([FromBody] AddEventDTO eventDto)
        {
            var createdEvent = await _eventService.AddEvent(eventDto);
            User usr = await GetCurrentUserAsync();

            if (createdEvent != null)
            {
                var addEventUser = await _eventService.AddUserToEvent(
                    new JoinEventDTO
                    {
                        EventId = createdEvent.Id,
                        UserId = usr.Id,
                        UserType = "Administrator"
                    });
                return CreatedAtRoute("GetEventById", new {id = createdEvent.Id}, createdEvent);
            }

            return BadRequest();
        }

        private Task<User> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
    }
}