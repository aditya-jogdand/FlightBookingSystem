using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }
        public DbSet<AppUser> appUsers { get; set; }
        public DbSet<Airport> Airports { get; set; }
        public DbSet<BankDetail> BankDetails { get; set; }
        public DbSet<Flight> Flights { get; set; }       
        public DbSet<Ticket> Tickets { get; set; }
    }
}
