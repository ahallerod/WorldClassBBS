using System.ComponentModel.DataAnnotations;

namespace WorldClassBBS.Models.Users
{
    public class AuthenticateResponse
    {
        public string Username { get; set; }
        public string LastLoginDate { get; set; }
        public string LastLoginTime { get; set; }

        public string Token { get; set; }
    }
}
