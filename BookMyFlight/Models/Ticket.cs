using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.Models
{
    public class Ticket 
    {
        [Key]
        public int TicketId { get; set; }
        public int SeatsBooked { get; set; }
        public double TotalFare { get; set; }
        public DateTime BookingDate { get; set; }
        public string PassengerName { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }

        [ForeignKey("UserId")]
        public int UserId { get; set; }
        public AppUser User { get; set; }

        [ForeignKey("FlightId")]
        public int FlightId { get; set; }
        public Flight Fight { get; set; }
       

    }
}
