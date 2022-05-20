using BookMyFlight.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [Authorize]
        [HttpGet("user")]
        public ActionResult<IEnumerable<string>> GetUser()
        {
            return new string[] { "User Board" };
        }

        [Authorize]
        [HttpGet("admin")]
        public ActionResult<IEnumerable<string>> GetAdmin()
        {
            return new string[] { "Admin Board" };
        }


    }
}
