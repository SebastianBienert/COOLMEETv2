using CoolMeet.BL.Interfaces;
using CoolMeet.BL.Services;
using CoolMeet.Repository;
using CoolMeet.Repository.Interfaces;
using CoolMeet.Repository.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using CoolMeet.Models.Models;
using CoolMeet.Web.Config;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;


namespace CoolMeet.Web
{
    public class Startup
    {
        public static IConfigurationRoot Configuration { get; set; }

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<Context>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("Connection")));

            IdentityConfiguration.AddIdentity(services);
            services.AddCors();
            services.AddMvc();

            IdentityConfiguration.ConfigureIdentity(services);
            services.AddSingleton(sp => MappingProfile.Initialize());
            services.AddSingleton(_ => Configuration as IConfigurationRoot);
            services.AddScoped<PasswordHasher<User>>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IEventRepository, EventRepository>();
            services.AddScoped<IEventService, EventService>();
            services.AddScoped<IStatusService, StatusService>();
            services.AddScoped<IEventUserService, EventUserService>();
            services.AddScoped<IEventUserRepository, EventUserRepository>();
            services.AddScoped<IStatusRepository, StatusRepository>();
            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<ICommentService, CommentService>();
            services.AddScoped<IUserService, UserService>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "CoolMeet API", Version = "v1" });
            });
            JwtConfiguration.AddJwtAuthorization(Configuration, services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseSwagger();

            app.UseAuthentication();
            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
            app.UseMvc();
        }
    }
}
