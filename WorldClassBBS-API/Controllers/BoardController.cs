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
        public IActionResult GetBoardById(int id)
        {
            var board = _boardService.GetBoardById(id);
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

        [HttpPut("add-category")]
        public IActionResult AddCategory(AddCategory model)
        {
            _boardService.AddCategory(model.BoardId, model.CategoryId);
            return Ok();
        }

        [HttpDelete("archive")]
        public IActionResult ArchiveBoard(int boardId)
        {
            if (HttpContext.Items["User"] is User user)
                _boardService.ArchiveBoard(boardId, user.UserId);
            return Ok();
        }
    }
}
