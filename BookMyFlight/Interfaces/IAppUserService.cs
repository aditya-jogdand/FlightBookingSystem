using BookMyFlight.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.Interfaces
{
    public interface IAppUserService
    {
        Task<List<AppUser>> GetAllUsers();
        Task<AppUser> GetUser(int id);
        Task<AppUser> InsertUser(AppUser user);
        Task<AppUser> UpdateUser(AppUser user);
        Task<AppUser> DeleteUser(int id);
    }
}
