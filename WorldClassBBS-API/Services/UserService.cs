using AutoMapper;
using WorldClassBBS.Entities;
using WorldClassBBS.Helpers;
using WorldClassBBS.Models.Users;

namespace WorldClassBBS.Services
{
    
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        void Register(RegisterRequest model);
        User GetUserById(int id);
        User GetUserByName(string name);
    }
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        
        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var user = _context.Users.FirstOrDefault(x => x.Username == model.Username);

            //validation
            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                throw new AppException("Username or Password in incorrect.");

            UpdateLastLoginDate(user.UserId);

            var response = _mapper.Map<AuthenticateResponse>(user);

            return response;
        }

        public void Register(RegisterRequest model)
        {
            if (_context.Users.Any(x => x.Username == model.Username))
                throw new AppException($"Username {model.Username} is already taken.");

            var user = _mapper.Map<User>(model);

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password);

            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public User GetUserById(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
                throw new KeyNotFoundException("User not found");
            return user;
        }

        public User GetUserByName(string name)
        {
            var user = _context.Users.FirstOrDefault(x => x.Username.Equals(name));
            if (user == null)
                throw new KeyNotFoundException("User not found");
            return user;
        }

        /**************************
         *     HELPER METHODS     *
         **************************/

        private void UpdateLastLoginDate(int userId)
        {
            var user = _context.Users.Find(userId);
            user.PreviousLogin = user.LastestLogin;
            user.LastestLogin = DateTime.Now;
            _context.SaveChanges();
        }

    }
}
