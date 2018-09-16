using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CoolMeet.BL.Interfaces;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Dtos.Security;
using CoolMeet.Models.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace CoolMeet.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    public class AccountController : BaseController
    {
        private readonly UserManager<User> _userManager;

        private readonly IUserService _userService;

        private readonly IMapper _mapper;

        public AccountController(UserManager<User> userManager, IUserService userService, IMapper mapper)
        {
            _userManager = userManager;
            _userService = userService;
            _mapper = mapper;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
        {
            var tokenResponse = await _userService.Login(loginUserDto);
            if (tokenResponse?.Token == null)
                return BadRequest();

            return Ok(tokenResponse);
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegistrationDTO registerUserDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _userService.RegisterUser(registerUserDto);
            if (result.Succeeded)
                return NoContent();

            return BadRequest();
        }

        [HttpPatch("password")]
        [Authorize]
        public async Task<IActionResult> ChangePasswordAsync([FromBody]ChangePasswordDTO changePasswordDto)
        {
            var user = await GetCurrentUserAsync();
            var verification = _userService.ConfirmUserPersonality(user, changePasswordDto.OldPassword);
            if (!verification)
            {
                return BadRequest("Wrong password");
            }
            if (changePasswordDto.NewPassword != changePasswordDto.NewPasswordConfirmation)
            {
                return BadRequest("Password doesnt match");
            }
            var result = await _userManager.ChangePasswordAsync(user, changePasswordDto.OldPassword, changePasswordDto.NewPassword);
            if (result.Succeeded)
            {
                return Ok();
            }
            return Ok(result.Errors);
        }

        [HttpPatch]
        [Authorize]
        public async Task<IActionResult> UpdateUserData([FromBody] UpdateUserDTO updateUserDto)
        {
            var user = await GetCurrentUserAsync();
            if (user.Id != updateUserDto.UserId)
                return Unauthorized();

            var updatedUser = _userService.UpdateUser(updateUserDto);
            return Ok(updatedUser);
        }

        [HttpPatch("settings")]
        [Authorize]
        public async Task<IActionResult> UpdateUserSettings([FromBody] UpdateUserSettingsDTO updateSettingsDto)
        {
            var user = await GetCurrentUserAsync();
            var updatedUser = _userService.UpdateUserSettings(updateSettingsDto, user.Id);
            if (updatedUser == null)
                return NotFound();
            
            return Ok(updatedUser);
        }

        [HttpPost("photo")]
        [Authorize]
        public async Task<IActionResult> UploadUserPhoto(IFormFile fileUpload)
        {
            if (fileUpload.Length > 0)
            {
                var updatedDto = await _userService.UpdateUserPhoto(fileUpload, (await GetCurrentUserAsync()).Id);
                return Ok(updatedDto);
            }

            return BadRequest();
        }

        private Task<User> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
    }
}