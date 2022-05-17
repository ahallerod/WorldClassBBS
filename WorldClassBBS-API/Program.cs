using WorldClassBBS.Services;
using WorldClassBBS.Helpers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Add db
builder.Services.AddDbContext<DataContext>();
//Add Cors
builder.Services.AddCors();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Authentication
builder.Services.AddAuthentication("Bearer").AddIdentityServerAuthentication("Bearer", options =>
{
    options.ApiName = "WorldClassBBS";
    options.Authority = "https://localhost:7206";
});

//Configure AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

//configure DI for services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IBoardService, BoardService>();
builder.Services.AddScoped<IPostService, PostService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

//Cors policies
app.UseCors(x => x
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader());

// global error handler
app.UseMiddleware<ErrorHandlerMiddleware>();

app.MapControllers();

app.Run();
