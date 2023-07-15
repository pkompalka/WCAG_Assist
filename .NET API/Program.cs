using mgrAPI.Data_Access_Layer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = builder.Configuration.GetConnectionString("MgrConnection");
builder.Services.AddDbContext<AuctionContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddDbContext<AuctionBuyerContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddDbContext<CategoryContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddDbContext<PictureContext>(options => options.UseSqlServer(connectionString));
builder.Services.AddDbContext<UserContext>(options => options.UseSqlServer(connectionString));

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("https://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
