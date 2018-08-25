using System.Linq;
using AutoMapper;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Models;
using Microsoft.Data.OData;

namespace CoolMeet.Web.Config
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.PhotoUrl,
                    opt =>
                    {
                        opt.Condition(src => src.PhotoPath != null);
                        opt.ResolveUsing<UrlResolver, RouteUrlInfo>(src => new RouteUrlInfo()
                        {
                            RouteName = "GetUserPhotoById",
                            RouteParams = new {id = src.Id}
                        });
                    });
            CreateMap<UserDto, User>();
            CreateMap<EventUser, UserShortDTO>()
                .ForMember(dest => dest.Name,
                    opts => opts.MapFrom(src => $"{src.User.FirstName} {src.User.LastName}"))
                .ForMember(dest => dest.Id,
                    opts => opts.MapFrom(src => src.User.Id))
                .ForMember(dest => dest.PhotoUrl,
                    opt =>
                    {
                        opt.Condition(src => src.User.PhotoPath != null);
                        opt.ResolveUsing<UrlResolver, RouteUrlInfo>(src => new RouteUrlInfo()
                        {
                            RouteName = "GetUserPhotoById",
                            RouteParams = new { id = src.UserId }
                        });
                    });
            CreateMap<Event, EventDTO>()
                .ForMember(dest => dest.Administrator,
                    opts => opts.MapFrom(src =>
                        src.Users.FirstOrDefault(userEvent => userEvent.UserType == "Administrator")))
                .ForMember(dest => dest.Comments, opts => opts.MapFrom(src => src.Comments))
                .ForMember(s => s.Status, c => c.MapFrom(m => m.Status));
            CreateMap<EventDTO, Event>();
            CreateMap<CommentDTO, Comment>().ReverseMap();
            CreateMap<EditCommentDTO, Comment>().ReverseMap();
            CreateMap<AddCommentDTO, Comment>();
            CreateMap<AddEventDTO, Event>();
            CreateMap<EventUser, JoinEventDTO>().ReverseMap();
            CreateMap<RegistrationDTO, User>();
            CreateMap<Status, StatusDto>().ReverseMap();
        }
    }
}