namespace CoolMeet.Models.Dtos
{
    public class AddCommentDTO
    {
        public int EventId { get; set; }
        public string UserId { get; set; }
        public string Text { get; set; }
    }
}