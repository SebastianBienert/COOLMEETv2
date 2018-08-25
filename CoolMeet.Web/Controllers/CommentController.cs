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
    public class CommentController : BaseController
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

        [HttpDelete]
        [Route("{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            var userId = GetCurrentUserAsync().Result.Id;
            if (await _commentService.DeleteComment(userId, commentId))
                return NoContent();
            else
                return BadRequest();

        }

        [HttpPatch]
        [Route("{commentId}")]
        public async Task<IActionResult> EditComment([FromRoute]int commentId, [FromBody]EditCommentDTO editCommentDto)
        {
            var userId = (await GetCurrentUserAsync()).Id;
            var result = await _commentService.EditComment(userId, commentId, editCommentDto);
            if (result == null)
                return BadRequest();

            return Ok(result);
        }

        private Task<User> GetCurrentUserAsync() => _userManager.GetUserAsync(HttpContext.User);
    }
}