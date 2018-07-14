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
    [Route("api/Comment")]
    [Authorize]
    public class CommentController : Controller
    {
        private readonly ICommentService _commentService;

        private readonly UserManager<User> _userManager;

        public CommentController(ICommentService commentService, UserManager<User> userManager)
        {
            _commentService = commentService;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> AddComment([FromBody] AddCommentDTO commentDto)
        {
            User user = await GetCurrentUserAsync();
            commentDto.UserId = user.Id;
            var comment = await _commentService.AddComment(commentDto);

            if (commentDto != null)
            {
                return CreatedAtRoute("GetEventById", new { id = comment.Id }, comment);
            }

            return BadRequest();
        }
        private Task<User> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
    }
}