using CoolMeet.Models.Models;
using CoolMeet.Repository.Interfaces;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace CoolMeet.Repository.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly Context _context;

        public CommentRepository(Context context)
        {
            _context = context;
        }

        public async Task<Comment> AddComment(Comment comment)
        {
            comment.Created = DateTime.Now;
            comment.User = _context.Users.SingleOrDefault(user => user.Id == comment.UserId);
            comment.Event = _context.Events.SingleOrDefault(ev => ev.Id == comment.EventId);

            await _context.Comments.AddAsync(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<List<Comment>> GetAllComments()
        {
            var result = await _context.Comments.ToListAsync();

            return result;
        }

        public async Task<List<Comment>> GetCommentForEvent(int eventId)
        {
            var result = await _context.Comments.Where(c => c.EventId == eventId).ToListAsync();

            return result;
        }
    }
}