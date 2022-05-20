using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.DTOs
{
    public class UserDto
    {
        
        public string  Email { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
        public int UserID { get; set; }
    }
}
