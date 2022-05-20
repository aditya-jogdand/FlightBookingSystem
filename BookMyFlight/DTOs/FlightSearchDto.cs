using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.DTOs
{
    public class FlightSearchDto
    {
        public string source { get; set; }
        public string destination { get; set; }
        public DateTime departureDate { get; set; }
        public int AvailableSeats { get; set; }
    }
}
