using MockDraftApi.Repositories;
using MockDraftApi.Models;
using MockDraftApi.Configuration;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using MockDraftApi.Services;

namespace MockDraftApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddTransient<MockDraftRepository>();
            builder.Services.AddScoped<MockDraftService>();
            builder.Services.AddHealthChecks();
            builder.Services.Configure<RouteOptions>(options => options.LowercaseUrls = true);
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors();
            //builder.Services.Add(new ServiceDescriptor(typeof(AppDbContext), new AppDbContext(Configuration.Get("DefaultConnection"))));
            builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
            new MySqlServerVersion(new Version(8,0,38))));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x => x
                .AllowAnyMethod()
                .AllowAnyHeader()
                .SetIsOriginAllowed(origin => true) // allow any origin
                                                    //.WithOrigins("https://localhost:44351")); // Allow only this origin can also have multiple origins separated with comma
                .AllowCredentials()); // allow credentials

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}