using System;

namespace CoolMeet.Models.Dtos
{
    public class CommentDTO
    {
        public int Id { get; set; }
        public DateTime Created { get; set; }
        public int EventId { get; set; }
        public string UserId { get; set; }
        public string Text { get; set; }
        public UserDto User { get; set; }
    }
}