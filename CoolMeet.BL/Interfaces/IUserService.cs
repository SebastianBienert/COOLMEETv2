using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Dtos.Security;
using CoolMeet.Models.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace CoolMeet.BL.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsers();

        Task<UserDto> GetUser(string id);

        Task<UserDto> GetUserByEmail(string email);

        Task<FileStream> GetUserPhoto(string id);

        Task<IdentityResult> RegisterUser(RegistrationDTO registerDTO);

        Task<TokenDto> Login(LoginUserDto loginUserDto);

        Task<UserDto> UpdateUser(UpdateUserDTO updateUserDto);

        Task<UserDto> UpdateUserPhoto(IFormFile file, string userId);

        Task<bool> DeleteUser(string id);

        bool ConfirmUserPersonality(User user, string password);
    }
}
