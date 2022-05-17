using System.ComponentModel.DataAnnotations;

namespace WorldClassBBS.Models.Boards
{
    public class NewBoard
    {
        [Required]
        [StringLength(70, ErrorMessage = "A Board {0} cannot be more than {1} characters")]
        public string Title { get; set; }
    }
}
