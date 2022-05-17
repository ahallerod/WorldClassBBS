using System.ComponentModel.DataAnnotations;

namespace WorldClassBBS.Models.Users
{
    public class RegisterRequest
    {
        [Required]
        [MaxLength(30)]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        [MaxLength(200)]
        public string Email { get; set; }
        [Required]
        [MaxLength(100)]
        [MinLength(4)]
        public string Password { get; set; }
    }
}
