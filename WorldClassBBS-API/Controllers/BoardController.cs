using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WorldClassBBS.Authorization;
using WorldClassBBS.Entities;
using WorldClassBBS.Helpers;
using WorldClassBBS.Models.Boards;
using WorldClassBBS.Services;

namespace WorldClassBBS.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class BoardController : ControllerBase
    {
        private readonly IBoardService _boardService;
        private readonly IMapper _mapper;
        private readonly AppSettings _appSettings;

        public BoardController(
            IBoardService boardService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _boardService = boardService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpGet("{id}")]
        public IActionResult GetBoardById(int Id)
        {
            var board = _boardService.GetBoardById(Id);
            return Ok(board);
        }

        [HttpGet]
        public IActionResult GetBoards(int index = 0, int count = 10, string sort = "date")
        {
            if (sort != "date")
                sort = "views";

            var boards = _boardService.GetBoards(index, count, sort);
            return Ok(boards);
        }

        [HttpPost("new")]
        public IActionResult CreateBoard(NewBoard model)
        {
            var user = (User)HttpContext.Items["User"];
            _boardService.CreateBoard(model, user);
            return Ok();
        }
    }
}
