using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookMyFlight.Models;
using BookMyFlight.Interfaces;

namespace BookMyFlight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUsersController : ControllerBase
    {
        private readonly IAppUserService _UserRepo;

        public AppUsersController(IAppUserService userRepo)
        {
            _UserRepo = userRepo;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult> GetUsers()
        {
            try
            {
                var users = await _UserRepo.GetAllUsers();
                return Ok(users);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetUser(int id)
        {
            try
            {
                var user = await _UserRepo.GetUser(id);
                return Ok(user);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, [FromBody] AppUser user)
        {
            try
            {
                if (id != user.UserId)
                {
                    return BadRequest();
                }
                await _UserRepo.UpdateUser(user);
                return Ok(user);
            }

            catch (Exception exp)
            {
                return BadRequest(exp);
            }

        }

        // POST: api/Users
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult> PostUser(AppUser user)
        {
            try
            {
                var newUser = await _UserRepo.InsertUser(user);
                if (newUser == null)
                {
                    return BadRequest();
                }
                return Ok(user);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            try
            {
                var user = await _UserRepo.DeleteUser(id);
                if (user == null)
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
