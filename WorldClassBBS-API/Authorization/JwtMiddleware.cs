using WorldClassBBS.Services;

namespace WorldClassBBS.Authorization
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;

        public JwtMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, IUserService userService, IJwtUtilities jwlUtils)
        {
            var token = context.Request.Headers["Token"].FirstOrDefault()?.Split(' ').Last();
            var userId = jwlUtils.ValidateToken(token);
            if(userId != null)
            {
                context.Items["User"] = userService.GetUserById(userId.Value);
            }

            await _next(context);
        }
    }
}
