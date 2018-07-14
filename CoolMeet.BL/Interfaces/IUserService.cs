using System.Collections.Generic;
using System.Threading.Tasks;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Dtos.Security;
using Microsoft.AspNetCore.Identity;

namespace CoolMeet.BL.Interfaces
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsers();

        Task<UserDto> GetUser(string id);

        Task<UserDto> GetUserByEmail(string email);

        Task<IdentityResult> RegisterUser(RegistrationDTO registerDTO);

        Task<TokenDto> Login(LoginUserDto loginUserDto);

        Task<bool> DeleteUser(string id);
    }
}
