using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using WorldClassBBS.Authorization;
using WorldClassBBS.Entities;
using WorldClassBBS.Helpers;
using WorldClassBBS.Models.Categories;
using WorldClassBBS.Models.Posts;
using WorldClassBBS.Services;

namespace WorldClassBBS_API.Controllers
{
   
    [ApiController]
    [Route("[controller]")]

    public class CategoryController : ControllerBase
    {
        public ICategoryService _categoryService { get; set; }

        public CategoryController(
            ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var category = _categoryService.GetById(id);
            return Ok(category);
        }

        [AllowAnonymous]
        [HttpPost("add")]
        public IActionResult AddCategory(NewCategory model)
        {
            var user = (User)HttpContext.Items["User"];
            _categoryService.Add(model, user);
            return Ok();

        }


    }
}
