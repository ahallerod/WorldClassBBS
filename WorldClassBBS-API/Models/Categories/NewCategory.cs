using System.ComponentModel.DataAnnotations;

namespace WorldClassBBS.Models.Categories
{
    public class NewCategory
    {
        [Required]
        [StringLength(20, ErrorMessage = "A Board {0} cannot be more than {1} characters")]
        public string Name { get; set; }
    }
}
