using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Routing;

namespace CoolMeet.Web.Config
{
    public class UrlResolver : IMemberValueResolver<object, object, RouteUrlInfo, String>
    {
        private readonly IUrlHelper urlHelper;

        public UrlResolver(IHttpContextAccessor httpContextAccessor)
        {
            var httpContext = httpContextAccessor.HttpContext;
            this.urlHelper = (IUrlHelper)httpContext.Items["URL_HELPER"];
        }

        public virtual string Resolve(object source, object destination,
            RouteUrlInfo sourceMember, string destMember, ResolutionContext context)
        {
            return this.urlHelper.Link(sourceMember.RouteName, sourceMember.RouteParams);
        }
    }
}
