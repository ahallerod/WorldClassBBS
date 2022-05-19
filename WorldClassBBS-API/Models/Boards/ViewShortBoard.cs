using WorldClassBBS.Models.Users;


namespace WorldClassBBS.Models.Boards
{
    public class ViewShortBoard
    {
        public int BoardId { get; set; }
        public string Title { get; set; }
        public int NoOfPosts { get; set; }
        public int Views { get; set; }
        public string CreatedDate { get; set; }
        public string CreatedTime { get; set; }
        public ViewUser CreatedByUser { get; set; }
    }
}
