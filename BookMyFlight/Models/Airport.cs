using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.Models
{
    public class Airport
    {
        [Key]
        public int AirportId { get; set; }
        public string AirportName { get; set; }
        public string AirportCode { get; set; }
        public string City { get; set; }
        public string State { get; set; }        
    }
}
