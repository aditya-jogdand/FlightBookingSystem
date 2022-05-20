using BookMyFlight.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.Interfaces
{
    public interface IAirportService
    {
        Task<List<Airport>> GetAllAirports();
        Task<Airport> GetAirport(int id);
        Task<Airport> InsertAirport(Airport airport);
        Task<Airport> UpdateAirport(Airport airport);
        Task<Airport> DeleteAirport(int id);
    }
}
