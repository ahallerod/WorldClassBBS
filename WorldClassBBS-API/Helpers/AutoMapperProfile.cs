using AutoMapper;
using WorldClassBBS.Entities;
using WorldClassBBS.Models.Users;
using WorldClassBBS.Models.Boards;
using WorldClassBBS.Models.Posts;
using WorldClassBBS.Models.Categories;

namespace WorldClassBBS.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, AuthenticateResponse>()
                .ForMember(dest => dest.LastLoginDate, opt => opt.MapFrom(src => src.PreviousLogin.ToShortDateString()))
                .ForMember(dest => dest.LastLoginTime, opt => opt.MapFrom(src => src.PreviousLogin.ToShortTimeString()));
            CreateMap<RegisterRequest, User>();
            CreateMap<User, ViewUser>();

            CreateMap<Board, ViewShortBoard>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.CreatedDate.ToShortDateString()))
                .ForMember(dest => dest.CreatedTime, opt => opt.MapFrom(src => src.CreatedDate.ToShortTimeString()));
            CreateMap<Board, BoardWithPosts>();
            CreateMap<NewBoard, Board>();

            CreateMap<Post, ViewPost>()
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => src.CreatedDate.ToShortDateString()))
                .ForMember(dest => dest.CreatedTime, opt => opt.MapFrom(src => src.CreatedDate.ToShortTimeString()));
            CreateMap<NewPost, Post>();

            CreateMap<NewCategory, Category>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Name));
            CreateMap<Category, DetailedViewCategory>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.CategoryName))
                .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => src.CreatedByUser));

            CreateMap<Category, BriefViewCategory>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.CategoryName));
        }
    }
}
