using AutoMapper;
using CoolMeet.BL.Interfaces;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Models;
using CoolMeet.Repository.Interfaces;
using System;
using System.Threading.Tasks;

namespace CoolMeet.BL.Services
{
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;

        private readonly IMapper _mapper;

        public CommentService(ICommentRepository repository, IMapper mapper)
        {
            _commentRepository = repository;
            _mapper = mapper;
        }
        public async Task<CommentDTO> AddComment(AddCommentDTO comment)
        {
            var commentResult = _mapper.Map<CommentDTO>(await _commentRepository.AddComment(_mapper.Map<Comment>(comment)));

            return commentResult;

        }

        public async Task<bool> DeleteComment(string userId, int commentId)
        {
            var comment = _mapper.Map<CommentDTO>(await _commentRepository.GetComment(commentId));
            if (comment.User.Id !=  userId)
                return false;

            return await _commentRepository.DeleteComment(commentId);
        }

        public async Task<CommentDTO> EditComment(string userId, int commentId, EditCommentDTO editCommentDto)
        {
            var comment = _mapper.Map<CommentDTO>(await _commentRepository.GetComment(commentId));
            if (comment.User.Id != userId)
                return null;

            var editedComment = _mapper.Map<CommentDTO>(await _commentRepository.UpdateComment(commentId, editCommentDto));
            return editedComment;
        }
    }
}