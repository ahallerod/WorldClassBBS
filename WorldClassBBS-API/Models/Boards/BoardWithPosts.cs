using WorldClassBBS.Models.Posts;
using WorldClassBBS.Models.Users;

namespace WorldClassBBS.Models.Boards
{
    public class BoardWithPosts
    {
        public ViewShortBoard Board { get; set; }
        public IEnumerable<ViewPost> Posts { get; set; }

    }
}
