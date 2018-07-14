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
    }
}