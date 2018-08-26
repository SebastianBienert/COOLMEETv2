using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Models;
using Microsoft.AspNetCore.Identity;

namespace CoolMeet.Repository.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsers();

        Task<User> GetUser(string id);

        Task<User> GetUserByEmail(string email);

        Task<User> SetUserPhotoPath(string userId, string path);

        Task<bool> DeleteUser(string id);

        Task<User> UpdateUser(UpdateUserDTO user);
    }
}
