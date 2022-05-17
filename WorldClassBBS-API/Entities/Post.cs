namespace WorldClassBBS.Entities
{
    public class Post
    {
        public int PostId { get; set; }
        public string Message { get; set; }
        public int CreatedByUserId { get; set; }
        public int BoardId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreatedDate { get; set; }
        public Board Board { get; set; }
        public User CreatedByUser { get; set; }

    }
}
