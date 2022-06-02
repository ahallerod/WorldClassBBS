using AutoMapper;
using WorldClassBBS.Helpers;
using WorldClassBBS.Entities;
using WorldClassBBS.Models.Boards;
using WorldClassBBS.Models.Users;
using WorldClassBBS.Models.Posts;
using Microsoft.EntityFrameworkCore;
using WorldClassBBS.Models.Categories;

namespace WorldClassBBS.Services
{
    public interface ICategoryService
    {
        public void Add(NewCategory category, User user);
        public DetailedViewCategory GetById(int categoryId);
        public void GetAllActive();
        public void ChangeName(string Name);
        public void Activate(Category category);
        public void Deactivate(Category category);
    }
    public class CategoryService : ICategoryService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CategoryService(
            DataContext context,
            IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public void Activate(Category category)
        {
            throw new NotImplementedException();
        }

        public void Add(NewCategory model, User user)
        {
            var category = _mapper.Map<Category>(model);
            category.CreatedByUser = user;
            category.CreatedByUserId = user.UserId;

            _context.Add(category);
            _context.SaveChanges();
        }

        public void ChangeName(string Name)
        {
            throw new NotImplementedException();
        }

        public void Deactivate(Category category)
        {
            throw new NotImplementedException();
        }

        public void GetAllActive()
        {
            throw new NotImplementedException();
        }

        public DetailedViewCategory GetById(int categoryId)
        {
            var category = _context.Categories
                .Include(x => x.CreatedByUser)
                .Include(x => x.Boards)
                .FirstOrDefault(x => x.CategoryId == categoryId);
            if (category == null)
                throw new AppException("Category not found.");
            var model = _mapper.Map<DetailedViewCategory>(category);
            return model;
        }
    }
}
