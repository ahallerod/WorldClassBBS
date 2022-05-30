using AutoMapper;
using WorldClassBBS.Helpers;
using WorldClassBBS.Entities;
using WorldClassBBS.Models.Boards;
using WorldClassBBS.Models.Users;
using WorldClassBBS.Models.Posts;
using Microsoft.EntityFrameworkCore;

namespace WorldClassBBS.Services
{
    public interface IBoardService
    {
        public void CreateBoard(NewBoard model, User user);
        public BoardWithPosts GetBoardById(int boardId);
        public IEnumerable<ViewShortBoard> GetBoards(int index, int count, string sort);
        public void EditBoard();
        public void ArchiveBoard(int boardId, int userId);
    }
    public class BoardService : IBoardService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public BoardService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void CreateBoard(NewBoard model, User user)
        {
            var board = _mapper.Map<Board>(model);
            board.CreatedByUser = user;
            board.CreatedByUserId = user.UserId;
            board.CreatedDate = DateTime.Now;

            _context.Add(board);
            _context.SaveChanges();

        }
        public BoardWithPosts GetBoardById(int boardId)
        {
            var board = _context.Boards.Include(x => x.CreatedByUser).FirstOrDefault(x => x.BoardId == boardId);
            if (board == null)
                throw new AppException("Board not found.");
            var model = new BoardWithPosts();
            model.Board = _mapper.Map<ViewShortBoard>(board);
            model.Board.CreatedByUser = _mapper.Map<ViewUser>(board.CreatedByUser);
            model.Board.NoOfPosts = _context.Posts.Where(x => x.BoardId == board.BoardId).Count();
            model.Posts = _mapper.Map<ViewPost[]>(
                _context.Posts.Include(x => x.CreatedByUser).Where(x => x.BoardId == board.BoardId).OrderByDescending(x => x.CreatedDate)
                .AsEnumerable());

            IncreaseNoOfViews(board);
            return model;
        }
        public IEnumerable<ViewShortBoard> GetBoards(int index, int count, string sort)
        {
            IQueryable<Board> query = _context.Boards.Include(x => x.CreatedByUser).Where(x => !x.IsArchived).AsNoTracking();

            if (sort == "date")
                query = query.OrderByDescending(x => x.CreatedDate);
            else
                query = query.OrderByDescending(x => x.Views);

            var boards = query.Skip(index).Take(count);

            if (!boards.Any())
                throw new AppException("No more boards to show.");

            var model = _mapper.Map<ViewShortBoard[]>(boards);

            foreach (var board in model)
            {
                board.NoOfPosts = _context.Posts.Where(x => x.BoardId == board.BoardId).Count();
            }

            return model;
        }

        public void EditBoard()
        {
            throw new NotImplementedException();
        }

        public void ArchiveBoard(int boardId, int userId)
        {
            var board = _context.Boards.Where(x => x.BoardId == boardId).FirstOrDefault();
            //verify that the user requesting the achiving is actually the creator of the board.
            if ( board != null && board.CreatedByUser.UserId == userId)
            {
                board.IsArchived = true;
                _context.Update(board);
                _context.SaveChanges();
            }
            else
            {
                throw new AppException("User not authorized to archive board");
            }
        }


        /**************************
         *     HELPER METHODS     *
         **************************/

        private void IncreaseNoOfViews(Board board)
        {
            board.Views++;
            _context.Boards.Update(board);
            _context.SaveChanges();
        }


    }
}
