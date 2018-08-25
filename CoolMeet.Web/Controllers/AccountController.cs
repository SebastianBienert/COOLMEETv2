using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoolMeet.BL.Interfaces;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Dtos.Security;
using CoolMeet.Models.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CoolMeet.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Account")]
    [Authorize]
    public class AccountController : BaseController
    {
        private readonly UserManager<User> _userManager;

        private readonly IUserService _userService;

        public AccountController(UserManager<User> userManager, IUserService userService)
        {
            _userManager = userManager;
            _userService = userService;
        }

        [HttpPatch("password")]
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
        public async Task<IActionResult> UpdateUserData([FromBody] UpdateUserDTO updateUserDto)
        {
            var user = await GetCurrentUserAsync();
            if (user.Id != updateUserDto.UserId)
                return Unauthorized();

            var updatedUser = _userService.UpdateUser(updateUserDto);
            return Ok(updatedUser);
        }
        private Task<User> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
    }
}