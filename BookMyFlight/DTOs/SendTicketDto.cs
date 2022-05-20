using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.DTOs
{
    public class SendTicketDto
    {
        public int flightId { get; set; }
        public string source { get; set; }
        public string destination { get; set; }
        public string email { get; set; }
        public DateTime departureDateAndTime { get; set; }
        public DateTime arrivalDateAndTime { get; set; }
        public string passengerName { get; set; }
        public string gender { get; set; }
        public int age { get; set; }
        public double totalFare { get; set; }
        public int seatsBooked { get; set; }
    }
}
