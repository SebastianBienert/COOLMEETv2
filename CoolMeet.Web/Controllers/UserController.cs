using System;
using System.Threading.Tasks;
using CoolMeet.BL.Interfaces;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Dtos.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CoolMeet.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/User")]
    public class UserController : BaseController
    {
        private readonly IUserService _serviceUser;
        public UserController(IUserService serviceUser)
        {
            _serviceUser = serviceUser;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _serviceUser.GetAllUsers();
            if (users != null)
                return Ok(users);

            return NotFound();
        }

        [HttpGet("{id}", Name = "GetUserById")]
        //[Authorize]
        public async Task<IActionResult> GetUser(string id)
        {
            var user = await _serviceUser.GetUser(id);
            if (user != null)
            {
                return Ok(user);
            }

            return NotFound();
        }

        [HttpGet("{id}/photo", Name = "GetUserPhotoById")]
        public async Task<IActionResult> GetUserPhoto(string id)
        {
            var image = await _serviceUser.GetUserPhoto(id);
            if (image == null)
            {
                return NotFound();
            }
            return File(image, "image/jpeg");
            
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(string id)
        {
            if (await _serviceUser.DeleteUser(id))
            {
                return Ok();
            }
            return NotFound();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Token([FromBody] LoginUserDto loginUserDto)
        {
            var tokenResponse = await _serviceUser.Login(loginUserDto);

            if (tokenResponse?.Token == null)
                return BadRequest();

            return Ok(tokenResponse);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] RegistrationDTO registerUserDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _serviceUser.RegisterUser(registerUserDto);

            if (result.Succeeded)
                return NoContent();

            return BadRequest();
        }

    }
}