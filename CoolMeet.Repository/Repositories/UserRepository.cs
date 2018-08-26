using System.Collections.Generic;
using System.Threading.Tasks;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Models;
using CoolMeet.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CoolMeet.Repository.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly Context _contextUser;

        public UserRepository(Context contextUser)
        {
            _contextUser = contextUser;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return await _contextUser.Users.ToListAsync();
        }

        public async Task<User> GetUser(string id)
        {
            return await _contextUser.Users.SingleOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _contextUser.Users.SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<User> SetUserPhotoPath(string userId, string path)
        {
            var entityToUpdate = await _contextUser.Users.SingleOrDefaultAsync(u => u.Id == userId);
            if (entityToUpdate != null)
            {
                entityToUpdate.PhotoPath = path;
                await _contextUser.SaveChangesAsync();
                return entityToUpdate;
            }

            return null;
        }

        public async Task<bool> DeleteUser(string id)
        {
            var entityToRemove = await _contextUser.Users.SingleOrDefaultAsync(u => u.Id == id);
            if (entityToRemove == null)
            {
                return false;
            }
            _contextUser.Users.Remove(entityToRemove);

            await _contextUser.SaveChangesAsync();
            return true;
        }

        public async Task<User> UpdateUser(UpdateUserDTO user)
        {
            var entityToUpdate = await _contextUser.Users.SingleOrDefaultAsync(u => u.Id == user.UserId);
            if (entityToUpdate != null)
            {
                _contextUser.Entry(entityToUpdate).CurrentValues.SetValues(user);
                await _contextUser.SaveChangesAsync();
                return entityToUpdate;
            }

            return null;
        }
    }
}