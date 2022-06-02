namespace WorldClassBBS.Entities
{
    public class Board
    {
        public int BoardId { get; set; }
        public string Title { get; set; }
        public int Views { get; set; }
        public bool IsArchived { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedByUserId { get; set; }
        public User CreatedByUser { get; set; }

        public virtual IEnumerable<Post> Posts { get; set; }
        public virtual ICollection<Category> Categories { get; set; }
    }
}
