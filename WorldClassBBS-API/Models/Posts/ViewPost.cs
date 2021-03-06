using WorldClassBBS.Models.Users;

namespace WorldClassBBS.Models.Posts
{
    public class ViewPost
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public ViewUser CreatedByUser { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedTime { get; set; }
    }
}
