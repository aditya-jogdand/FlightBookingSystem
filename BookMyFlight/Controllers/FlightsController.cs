using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookMyFlight.Models;
using BookMyFlight.Interfaces;
using BookMyFlight.DTOs;

namespace BookMyFlight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        private readonly IFlightService _FlightRepo;
        public FlightsController(IFlightService flightRepo)
        {
            _FlightRepo = flightRepo;
        }

        // GET: api/Flights
        [HttpGet]
        public async Task<ActionResult> GetFlights()
        {
            try
            {
                var flights = await _FlightRepo.GetAllFlights();
                return Ok(flights);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        // GET: api/Flights/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetFlight(int id)
        {
            try
            {
                var flight = await _FlightRepo.GetFlight(id);
                return Ok(flight);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }

        // PUT: api/Flights/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFlight(int id, [FromBody] Flight flight)
        {
            try
            {
                if (id != flight.FlightId)
                {
                    return BadRequest();
                }
                await _FlightRepo.UpdateFlight(flight);
                return Ok(flight);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }

        // POST: api/Flights
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult> PostFlight(Flight flight)
        {
            try
            {
                var newFlight = await _FlightRepo.InsertFlight(flight);
                if (newFlight == null)
                {
                    return BadRequest();
                }
                return Ok(flight);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }

        // DELETE: api/Flights/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFlight(int id)
        {
            try
            {
                var flight = await _FlightRepo.DeleteFlight(id);
                if (flight == null)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception exp)
            {

                return BadRequest(exp);
            }
        }

        [HttpPost]
        [Route("search")]
        public IActionResult SearchFlights([FromBody] FlightSearchDto flightToBeSearched)
        {
            try
            {
                var flights = _FlightRepo.SearchFlight(flightToBeSearched);
                if(flights == null)
                {
                    return NoContent(); 
                }
                return Ok(flights);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }
           



    }
}
