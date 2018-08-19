using CoolMeet.Models.Dtos;
using System.Threading.Tasks;

namespace CoolMeet.BL.Interfaces
{
    public interface ICommentService
    {
        Task<CommentDTO> AddComment(AddCommentDTO comment);

        Task<bool> DeleteComment(string userId, int commentId);

        Task<CommentDTO> EditComment(string userId, int commentId, EditCommentDTO editCommentDto);
    }
}