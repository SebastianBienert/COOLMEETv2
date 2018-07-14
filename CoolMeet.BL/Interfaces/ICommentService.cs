using CoolMeet.Models.Dtos;
using System.Threading.Tasks;

namespace CoolMeet.BL.Interfaces
{
    public interface ICommentService
    {
        Task<CommentDTO> AddComment(AddCommentDTO comment);
    }
}