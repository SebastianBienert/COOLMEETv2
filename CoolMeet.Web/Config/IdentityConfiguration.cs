using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CoolMeet.Models.Models;
using CoolMeet.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace CoolMeet.Web.Config
{
    public class IdentityConfiguration
    {
        public static void ConfigureIdentity(IServiceCollection services)
        {
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;

                // User settings
                options.User.RequireUniqueEmail = true;
            });
        }

        public static void AddIdentity(IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole>()
                .AddEntityFrameworkStores<Context>()
                .AddDefaultTokenProviders();
        }
    }
}
