using CoolMeet.Models.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using CoolMeet.Models.Dtos;

namespace CoolMeet.Repository.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllComments();

        Task<List<Comment>> GetCommentForEvent(int eventId);

        Task<Comment> AddComment(Comment comment);

        Task<Comment> GetComment(int commentId);

        Task<bool> DeleteComment(int commentId);

        Task<Comment> UpdateComment(int commentId, EditCommentDTO commentDto);
    }
}