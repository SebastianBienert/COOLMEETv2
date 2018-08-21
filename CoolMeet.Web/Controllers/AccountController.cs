using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoolMeet.BL.Interfaces;
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
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;

        public AccountController(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        [HttpPatch("password")]
        public async Task<IActionResult> ChangePasswordAsync([FromBody]ChangePasswordDTO changePasswordDto)
        {
            User user = await GetCurrentUserAsync();
            var verification =
                _userManager.PasswordHasher.VerifyHashedPassword(user, user.PasswordHash,
                    changePasswordDto.OldPassword);
            if (verification == PasswordVerificationResult.Failed)
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

        private Task<User> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
    }
}