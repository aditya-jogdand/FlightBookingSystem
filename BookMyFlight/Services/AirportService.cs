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
    public class AirportService : IAirportService
    {
        private readonly ApplicationDbContext _Context;
        public AirportService(ApplicationDbContext context)
        {
            _Context = context;
        }
        public async Task<Airport> DeleteAirport(int id)
        {
            var airport = await _Context.Airports.SingleOrDefaultAsync(c => c.AirportId == id);
            _Context.Remove(airport);
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Deleting Airport Record");
            }
            return airport;
        }

        private Task StatusCode(object status500InternalServerError, string v)
        {
            throw new NotImplementedException();
        }

        public async Task<Airport> GetAirport(int id)
        {
            return await _Context.Airports.SingleOrDefaultAsync(c => c.AirportId == id);
        }

        public async Task<List<Airport>> GetAllAirports()
        {
            return await _Context.Airports.ToListAsync();
        }

        public async Task<Airport> InsertAirport(Airport airport)
        {
            _Context.Add(airport);
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Adding Airport Record");
            }
            return airport;
        }

        public async Task<Airport> UpdateAirport(Airport airport)
        {
            _Context.Airports.Attach(airport);
            _Context.Entry(airport).State = EntityState.Modified;
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Updating Airport Record");
            }
            return airport;
        }
    }
}
