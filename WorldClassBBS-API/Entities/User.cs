using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace WorldClassBBS.Entities
{
    public class User
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public bool IsDeactivated { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime LastestLogin { get; set; }
        public DateTime PreviousLogin { get; set; }
        public string Username { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }
        [JsonIgnore]
        public virtual IEnumerable<Board> Boards { get; set; }
        [JsonIgnore]
        public virtual IEnumerable<Post> Posts { get; set; }
    }
}
