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
    public class BankDetailsController : ControllerBase
    {
        private readonly IBankDetailService _BankRepo;

        public BankDetailsController(IBankDetailService bankRepo)
        {
            _BankRepo = bankRepo;
        }

        // GET: api/BankDetails
        [HttpGet]
        public async Task<ActionResult> GetBankDetails()
        {
            try
            {
                var bankdetails = await _BankRepo.GetAllBankDetail();
                return Ok(bankdetails);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        // GET: api/BankDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetBankDetails(int id)
        {
            try
            {
                var bankdetails = await _BankRepo.GetBankDetail(id);
                return Ok(bankdetails);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }

        // PUT: api/BankDetails/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBankDetails(int id, [FromBody] BankDetail bankDetails)
        {
            try
            {
                if (id != bankDetails.BankDetailsId)
                {
                    return BadRequest();
                }
                await _BankRepo.UpdateBankDetail(bankDetails);
                return Ok(bankDetails);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }

        // POST: api/BankDetails
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult> PostBankDetails(BankDetail bankDetails)
        {
            try
            {
                var bank = await _BankRepo.InsertBankDetail(bankDetails);
                if (bank == null)
                {
                    return BadRequest();
                }
                return Ok(bankDetails);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }

        // DELETE: api/BankDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBankDetails(int id)
        {
            try
            {
                var bankdetails = await _BankRepo.DeleteBankDetail(id);
                if (bankdetails == null)
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
