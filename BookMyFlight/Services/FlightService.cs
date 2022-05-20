using BookMyFlight.DTOs;
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
    public class FlightService : IFlightService
    {
        private readonly ApplicationDbContext _Context;
        public FlightService(ApplicationDbContext context)
        {
            _Context = context;
        }
        public async Task<Flight> DeleteFlight(int id)
        {
            var flight = await _Context.Flights.SingleOrDefaultAsync(c => c.FlightId == id);
            _Context.Remove(flight);
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Deleting BankDetails.");
            }

            return flight;
        }

        private Task StatusCode(object status500InternalServerError, string v)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Flight>> GetAllFlights()
        {
            return await _Context.Flights.ToListAsync();
        }

        public async Task<Flight> GetFlight(int id)
        {
            return await _Context.Flights.SingleOrDefaultAsync(c => c.FlightId == id);
        }

        public async Task<Flight> InsertFlight(Flight flight)
        {
            _Context.Add(flight);
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Adding Airport Record");
            }

            return flight;
        }

        public async Task<Flight> UpdateFlight(Flight flight)
        {
            _Context.Flights.Attach(flight);
            _Context.Entry(flight).State = EntityState.Modified;
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Updating Airport Record");
            }

            return flight;
        }

        public IEnumerable<Flight> SearchFlight(FlightSearchDto flightToBeSearched)
        {
           IEnumerable<Flight> AvailableFlight = _Context.Flights.Where(flight =>
            flight.Source.Equals(flightToBeSearched.source) &&
            flight.Destination.Equals(flightToBeSearched.destination) &&
            flight.DepartureDateAndTime.Date == flightToBeSearched.departureDate.Date);

            return  AvailableFlight;
        }
    }
}
