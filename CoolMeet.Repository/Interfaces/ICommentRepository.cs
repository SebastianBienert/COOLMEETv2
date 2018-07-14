using CoolMeet.Models.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CoolMeet.Repository.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllComments();
        Task<List<Comment>> GetCommentForEvent(int eventId);
        Task<Comment> AddComment(Comment comment);
    }
}