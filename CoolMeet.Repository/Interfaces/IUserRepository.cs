using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CoolMeet.Models.Models;
using Microsoft.AspNetCore.Identity;

namespace CoolMeet.Repository.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsers();

        Task<User> GetUser(string id);

        Task<User> GetUserByEmail(string email);

        Task<bool> DeleteUser(string id);

        Task<bool> UpdateUser(User user);
    }
}
