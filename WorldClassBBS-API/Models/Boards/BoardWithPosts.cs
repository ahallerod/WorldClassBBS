using WorldClassBBS.Models.Posts;
using WorldClassBBS.Models.Users;

namespace WorldClassBBS.Models.Boards
{
    public class BoardWithPosts
    {
        public int BoardId { get; set; }
        public string Title { get; set; }
        public ViewUser CreatedByUser { get; set; }
        public DateTime CreatedDate { get; set; }
        public int Views { get; set; }
        public IEnumerable<ViewPost> Posts { get; set; }

    }
}
