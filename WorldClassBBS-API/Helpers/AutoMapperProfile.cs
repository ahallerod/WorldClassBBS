using AutoMapper;
using WorldClassBBS.Entities;
using WorldClassBBS.Models.Users;
using WorldClassBBS.Models.Boards;
using WorldClassBBS.Models.Posts;

namespace WorldClassBBS.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, AuthenticateResponse>();
            CreateMap<RegisterRequest, User>();
            CreateMap<User, ViewUser>();

            CreateMap<Board, ViewShortBoard>();
            CreateMap<Board, BoardWithPosts>();
            CreateMap<NewBoard, Board>();

            CreateMap<Post, ViewPost>();
            CreateMap<NewPost, Post>();

        }
    }
}
