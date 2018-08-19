using System.Linq;
using AutoMapper;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Models;

namespace CoolMeet.Web.Config
{
    public class MappingProfile
    {
        public static IMapper Initialize()
        {
            var mapperCfg = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserDto>().ReverseMap();
                cfg.CreateMap<EventUser, UserShortDTO>()
                    .ForMember(dest => dest.Name,
                        opts => opts.MapFrom(src => $"{src.User.FirstName} {src.User.LastName}"))
                    .ForMember(dest => dest.Id,
                        opts => opts.MapFrom(src => src.User.Id));
                cfg.CreateMap<Event, EventDTO>()
                    .ForMember(dest => dest.Administrator,
                        opts => opts.MapFrom(src =>
                            src.Users.FirstOrDefault(userEvent => userEvent.UserType == "Administrator")))
                  .ForMember(dest => dest.Comments, opts => opts.MapFrom(src => src.Comments))
                   .ForMember(s => s.Status, c => c.MapFrom(m => m.Status));
                cfg.CreateMap<EventDTO, Event>();
                cfg.CreateMap<CommentDTO, Comment>().ReverseMap();
                cfg.CreateMap<EditCommentDTO, Comment>().ReverseMap();
                cfg.CreateMap<AddCommentDTO, Comment>();
                cfg.CreateMap<AddEventDTO, Event>();
                cfg.CreateMap<EventUser, JoinEventDTO>().ReverseMap();
                cfg.CreateMap<RegistrationDTO, User>();
                cfg.CreateMap<Status, StatusDto>().ReverseMap();
            });
            return mapperCfg.CreateMapper();
        }
    }
}