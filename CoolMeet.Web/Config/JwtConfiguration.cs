using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace CoolMeet.Web.Config
{
    public class JwtConfiguration
    {
        public static void AddJwtAuthorization(IConfigurationRoot configuration, IServiceCollection services)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                IssuerSigningKey =
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenConfiguration:Key"])),
                ValidAudience = configuration["TokenConfiguration:Audience"],
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                ValidIssuer = configuration["TokenConfiguration:Issuer"]
            };


            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(o => { o.TokenValidationParameters = tokenValidationParameters; });
        }
    }
}

