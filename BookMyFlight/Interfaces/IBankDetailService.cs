using BookMyFlight.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.Interfaces
{
    public interface IBankDetailService
    {
        Task<List<BankDetail>> GetAllBankDetail();
        Task<BankDetail> GetBankDetail(int id);
        Task<BankDetail> InsertBankDetail(BankDetail address);
        Task<BankDetail> UpdateBankDetail(BankDetail address);
        Task<BankDetail> DeleteBankDetail(int id);
    }
}
