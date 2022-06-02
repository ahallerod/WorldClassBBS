using WorldClassBBS.Models.Boards;
using WorldClassBBS.Models.Users;

namespace WorldClassBBS.Models.Categories
{
    public class DetailedViewCategory
    {
        public string Name { get; set; }
        public IEnumerable<ViewShortBoard> Boards { get; set; }
        public ViewUser CreatedBy { get; set; }
    }
}
