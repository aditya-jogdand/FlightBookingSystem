using BookMyFlight.Interfaces;
using BookMyFlight.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.Services
{
    public class AppUserService : IAppUserService
    {
        private readonly ApplicationDbContext _Context;
        public AppUserService(ApplicationDbContext context)
        {
            _Context = context;
        }
        public async Task<AppUser> DeleteUser(int id)
        {
            var user = await _Context.appUsers.SingleOrDefaultAsync(c => c.UserId == id);
            _Context.Remove(user);
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Deleting User Record");
            }
            return user;
        }

        private Task StatusCode(int status500InternalServerError, string v)
        {
            throw new NotImplementedException();
        }

        public async Task<List<AppUser>> GetAllUsers()
        {
            return await _Context.appUsers.ToListAsync();
        }

        public async Task<AppUser> GetUser(int id)
        {
            return await _Context.appUsers.SingleOrDefaultAsync(c => c.UserId == id);
        }

        public async Task<AppUser> InsertUser(AppUser user)
        {
            _Context.Add(user);
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Adding User Record");
            }
            return user;
        }

        public async Task<AppUser> UpdateUser(AppUser user)
        {
            _Context.appUsers.Attach(user);
            _Context.Entry(user).State = EntityState.Modified;
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Updating User Record");
            }
            return user;
        }
    }
}
