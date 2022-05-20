using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.Models
{
    public class Flight
    {
        [Key]
        public int FlightId { get; set; }
        public string Source { get; set; }
        public string Destination { get; set; }
        public DateTime DepartureDateAndTime { get; set; }
        public DateTime ArrivalDateAndTime { get; set; }     
        public int SeatCapacity { get; set; }        
        public int AvailableSeats { get; set; }
        public double Fare { get; set; }
    }
}
