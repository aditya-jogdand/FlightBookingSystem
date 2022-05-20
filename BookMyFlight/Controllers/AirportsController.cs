using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookMyFlight.Interfaces;
using BookMyFlight.Models;

namespace BookMyFlight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirportsController : ControllerBase
    {
        private readonly IAirportService _AirportRepo;
        public AirportsController(IAirportService airportRepo)
        {
            _AirportRepo = airportRepo;
        }

        // GET: api/Airports
        [HttpGet]
        public async Task<ActionResult> GetAirports()
        {
            try
            {
                var airports = await _AirportRepo.GetAllAirports();
                return Ok(airports);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        // GET: api/Airports/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetAirport(int id)
        {
            try
            {
                var airport = await _AirportRepo.GetAirport(id);
                return Ok(airport);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }

        // PUT: api/Airports/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAirport(int id, [FromBody]Airport airport)
        {
            try
            {
                if (id != airport.AirportId)
                {
                    return BadRequest();
                }
                await _AirportRepo.UpdateAirport(airport);
                return Ok(airport);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }

        // POST: api/Airports
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult> PostAirport(Airport airport)
        {
            try
            {
                var newAirport = await _AirportRepo.InsertAirport(airport);
                if (newAirport == null)
                {
                    return BadRequest();
                }
                return Ok(airport);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }


        // DELETE: api/Airports/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAirport(int id)
        {
            try
            {
                var airport = await _AirportRepo.DeleteAirport(id);
                if (airport == null)
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
    }
}
