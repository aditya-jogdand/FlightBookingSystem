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
    public class BankDetailService : IBankDetailService
    {
        private readonly ApplicationDbContext _Context;
        public BankDetailService(ApplicationDbContext context)
        {
            _Context = context;
        }

        public async Task<BankDetail> DeleteBankDetail(int id)
        {
            var bankDetails = await _Context.BankDetails.SingleOrDefaultAsync(c => c.BankDetailsId == id);
            _Context.Remove(bankDetails);
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Deleting BankDetails.");
            }

            return bankDetails;
        }

        private Task StatusCode(int status500InternalServerError, string v)
        {
            throw new NotImplementedException();
        }

        public async Task<List<BankDetail>> GetAllBankDetail()
        {
            return await _Context.BankDetails.ToListAsync();
        }

        public async Task<BankDetail> GetBankDetail(int id)
        {
            return await _Context.BankDetails.SingleOrDefaultAsync(c => c.BankDetailsId == id);
        }

        public async Task<BankDetail> InsertBankDetail(BankDetail bankDetails)
        {
            _Context.Add(bankDetails);
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Adding BankDetails.");
            }

            return bankDetails;
        }

        public async Task<BankDetail> UpdateBankDetail(BankDetail bankDetails)
        {
            _Context.BankDetails.Attach(bankDetails);
            _Context.Entry(bankDetails).State = EntityState.Modified;
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Updating BankDetails.");
            }
            return bankDetails;
        }

       
    }
}
