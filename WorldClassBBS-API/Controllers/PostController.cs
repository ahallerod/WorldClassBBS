using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WorldClassBBS.Authorization;
using Microsoft.Extensions.Options;
using WorldClassBBS.Helpers;
using WorldClassBBS.Entities;
using WorldClassBBS.Models.Posts;
using WorldClassBBS.Services;

namespace WorldClassBBS.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class PostController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;

        public PostController(
            IPostService postService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _postService = postService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }
        
        [HttpGet("{id}")]
        public IActionResult GetPostById(int id)
        {
            var post = _postService.GetPostById(id);
            return Ok(post);
        }


        [HttpPost("new")]
        public IActionResult NewPost(NewPost model)
        {
            var user = (User)HttpContext.Items["User"];
            _postService.NewPost(model, user);
            return Ok();
        }
    }
}
