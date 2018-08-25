using AutoMapper;
using CoolMeet.BL.Interfaces;
using CoolMeet.Models.Dtos;
using CoolMeet.Models.Dtos.Security;
using CoolMeet.Models.Models;
using CoolMeet.Repository.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CoolMeet.BL.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _repositoryUser;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly IConfigurationRoot _configuration;

        public UserService(IUserRepository repository, IMapper mapper, UserManager<User> userManager, PasswordHasher<User> passwordHasher, IConfigurationRoot configuration)
        {
            _repositoryUser = repository;
            _mapper = mapper;
            _userManager = userManager;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }

        public async Task<TokenDto> Login(LoginUserDto loginUserDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginUserDto.Email);

            var token = ConfirmUserPersonality(user, loginUserDto.Password) ? GetJwtSecurityToken(user) : null;
            if (user == null || token == null)
            {
                return null;
            }
            return new TokenDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                UserInformation = _mapper.Map<UserDto>(user)
            };
        }

        public async Task<UserDto> UpdateUser(UpdateUserDTO updateUserDto)
        {
            if (updateUserDto == null)
                return null;
            var updatedUserEntity = await _repositoryUser.UpdateUser(updateUserDto);
            return _mapper.Map<User, UserDto>(updatedUserEntity);
        }

        public bool ConfirmUserPersonality(User user, string password)
        {
            if (user == null)
            {
                return false;
            }
            var resultOfveryfyingPassword =
                _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
            return resultOfveryfyingPassword == PasswordVerificationResult.Success;
        }

        private JwtSecurityToken GetJwtSecurityToken(User user)
        {
            return new JwtSecurityToken(
                issuer: _configuration["TokenConfiguration:Issuer"],
                audience: _configuration["TokenConfiguration:Audience"],
                claims: GetTokenClaims(user),
                expires: DateTime.UtcNow.AddMinutes(int.Parse(_configuration["TokenConfiguration:TimeInMinutesOfJwtLife"])),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["TokenConfiguration:Key"])), SecurityAlgorithms.HmacSha256)
            );
        }

        private IEnumerable<Claim> GetTokenClaims(User user)
        {
            return new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.GivenName, user.FirstName),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.NameId, user.Id)
            };
        }

        public async Task<IEnumerable<UserDto>> GetAllUsers()
        {
            var users = await _repositoryUser.GetAllUsers();
            var result = _mapper.Map<IEnumerable<UserDto>>(users);
            return result;
        }

        public async Task<FileStream> GetUserPhoto(string id)
        {
            var user = await _repositoryUser.GetUser(id);
            try
            {
                var image = File.OpenRead(user.PhotoPath);
                return image;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<UserDto> GetUser(string id)
        {
            var user = await _repositoryUser.GetUser(id);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> GetUserByEmail(string email)
        {
            var user = await _repositoryUser.GetUserByEmail(email);
            return _mapper.Map<UserDto>(user);
        }

        public async Task<IdentityResult> RegisterUser(RegistrationDTO registerDTO)
        {
            var userIdentity = _mapper.Map<User>(registerDTO);

            var user = await _userManager.CreateAsync(userIdentity, registerDTO.Password);

            return user;
        }

        public async Task<bool> DeleteUser(string id)
        {
            return await _repositoryUser.DeleteUser(id);
        }
    }
}
