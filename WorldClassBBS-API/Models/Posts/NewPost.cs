using System.ComponentModel.DataAnnotations;

namespace WorldClassBBS.Models.Posts
{
    public class NewPost
    {
        [Required]
        [StringLength(140, ErrorMessage = "A Board {0} cannot be more than {1} characters")]
        public string Message { get; set; }
        [Required]
        public int BoardId { get; set; }
    }
}
