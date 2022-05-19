using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WorldClassBBS.Entities;

namespace WorldClassBBS.Authorization
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            //Allow anonymous access to endpoints marked [AllowAnonymous]
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
            if (allowAnonymous)
                return;

           var user = (User)context.HttpContext.Items["User"];
           if (user == null)
                context.Result = new JsonResult(new { message = "Unauthorized"}) { StatusCode = StatusCodes.Status401Unauthorized };
        }
    }
}
