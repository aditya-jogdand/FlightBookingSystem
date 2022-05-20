using BookMyFlight.DTOs;
using BookMyFlight.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.Interfaces
{
    public interface IFlightService
    {
        Task<List<Flight>> GetAllFlights();
        Task<Flight> GetFlight(int id);
        Task<Flight> InsertFlight(Flight flight);
        Task<Flight> UpdateFlight(Flight flight);
        Task<Flight> DeleteFlight(int id);
        IEnumerable<Flight> SearchFlight(FlightSearchDto flightToBeSearched);     
    }
}
