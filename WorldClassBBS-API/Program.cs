using WorldClassBBS.Services;
using WorldClassBBS.Helpers;
using WorldClassBBS.Authorization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//Add db
builder.Services.AddDbContext<DataContext>();

//Cors policies
builder.Services.AddCors();

builder.Services.AddAuthentication(o =>
{
    o.DefaultScheme = "SchemesNamesConst.TokenAuthenticationDefaultScheme";
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//Identity Server Authentication
/*
builder.Services.AddAuthentication("Bearer").AddIdentityServerAuthentication("Bearer", options =>
{
    options.ApiName = "WorldClassBBS";
    options.Authority = "https://localhost:7150";
});
*/

//Configure AutoMapper
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));

//configure DI for services
builder.Services.AddScoped<IJwtUtilities, JwtUtils>();
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

//app.UseHttpsRedirection();
app.UseRouting();


app.UseAuthorization();

//Cors policies
app.UseCors(x => x
    .WithOrigins("http://localhost:3000")
    .AllowAnyMethod()
    .AllowAnyHeader());

// global error handler
app.UseMiddleware<ErrorHandlerMiddleware>();

// custom jwt auth middleware
app.UseMiddleware<JwtMiddleware>();

app.MapControllers();

app.Run();
