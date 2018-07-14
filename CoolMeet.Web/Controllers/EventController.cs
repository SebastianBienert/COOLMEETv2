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
    [Authorize]
    public class EventController : Controller
    {
        private readonly IEventService _eventService;

        private readonly IEventUserService _eventUserService;

        private readonly IStatusService _statusService;

        private readonly UserManager<User> _userManager;

        public EventController(IEventService eventService, IEventUserService eventUserService,
            IStatusService statusService, UserManager<User> userManager)
        {
            _eventService = eventService;
            _eventUserService = eventUserService;
            _statusService = statusService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetEvents()
        {
            var events = await _eventService.GetAllEvents();

            if (events != null)
                return Ok(events);

            return NotFound();
        }

        [HttpGet("GetLoggedUserEvents", Name = "GetLoggedUserEvents")]
        public async Task<IActionResult> GetLoggedUserEvents()
        {
            User user = await GetCurrentUserAsync();
            var events = await _eventService.GetLoggedUserEvents(user.Id);

            if (events != null)
                return Ok(events);

            return NotFound();
        }

        [HttpGet("eventInfo/{id}", Name = "GetEventById")]
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
            var dto = await _eventUserService.GetEventUserEntity(id);
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

        [HttpPost("leave/{eventId}")]
        public async Task<IActionResult> LeaveUserFromEvent(int eventId)
        {
            User user = await GetCurrentUserAsync();

            if (await _eventUserService.LeaveUserFromEvent(user.Id, eventId))
            {
                return Ok();
            }

            return NotFound();
        }

        [HttpPost("join/{eventId}")]
        public async Task<IActionResult> AddUserToEvent(int eventId)
        {
            User user = await GetCurrentUserAsync();

            var addEventUser = await _eventUserService.AddUserToEvent(
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

        [HttpPut]
        public async Task<IActionResult> EditEvent([FromBody] AddEventDTO eventDto)
        {
            var editedDto = await _eventService.UpdateEvent(eventDto);

            if (editedDto != null)
            {
                return Ok(editedDto);
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
                var addEventUser = await _eventUserService.AddUserToEvent(
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