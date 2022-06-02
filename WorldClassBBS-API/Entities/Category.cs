namespace WorldClassBBS.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int CreatedByUserId { get; set; }
        public User CreatedByUser { get; set; }
        public bool IsActive { get; set; } = true;
        public virtual ICollection<Board> Boards { get; set; }

    }
}
