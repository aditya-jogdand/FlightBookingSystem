using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.Models
{
    public class BankDetail
    {
        [Key]
        public int BankDetailsId { get; set; }
        public string BankName { get; set; }
        public string AccountNumber { get; set; }
        public string IFSC_Code { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }
        public AppUser User { get; set; }
       
    }
}
