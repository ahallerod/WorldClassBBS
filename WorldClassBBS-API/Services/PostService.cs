using AutoMapper;
using WorldClassBBS.Entities;
using WorldClassBBS.Helpers;
using WorldClassBBS.Models.Posts;

namespace WorldClassBBS.Services
{
    public interface IPostService
    {
        void NewPost(NewPost model, User user);
        ViewPost GetPostById(int id);
        

    }
    public class PostService : IPostService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PostService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public ViewPost GetPostById(int id)
        {
            var post = _context.Posts.Find(id);
            if (post == null)
                throw new AppException("Post not found");
            var model = _mapper.Map<ViewPost>(post);
            return model;
        }

        public void NewPost(NewPost model, User user)
        {
            var post = _mapper.Map<Post>(model);

            post.CreatedByUser = user;
            post.CreatedByUserId = user.UserId;

            _context.Posts.Add(post);
            _context.SaveChanges();
        }
    }
}
