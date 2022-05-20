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
    public class TicketService : ITicketService
    {
        private readonly ApplicationDbContext _Context;
        public TicketService(ApplicationDbContext context)
        {
            _Context = context;
        }
        public async Task<Ticket> DeleteTicket(int id)
        {
            var ticket = await _Context.Tickets.SingleOrDefaultAsync(c => c.TicketId == id);
            _Context.Remove(ticket);
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Deleting Ticket Record");
            }

            return ticket;
        }

        private Task StatusCode(object status500InternalServerError, string v)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Ticket>> GetAllTickets()
        {
            return await _Context.Tickets.ToListAsync();
        }

        public async Task<Ticket> GetTicket(int id)
        {
            return await _Context.Tickets.SingleOrDefaultAsync(c => c.TicketId == id);
        }

        public async Task<Ticket> InsertTicket(Ticket ticket)
        {
            _Context.Add(ticket);
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Adding Ticket Record");
            }

            return ticket;
        }

        public async Task<Ticket> UpdateTicket(Ticket ticket)
        {
            _Context.Tickets.Attach(ticket);
            _Context.Entry(ticket).State = EntityState.Modified;
            try
            {
                await _Context.SaveChangesAsync();
            }
            catch (Exception)
            {
                await StatusCode(StatusCodes.Status500InternalServerError, "Error Updating User Record");
            }

            return ticket;
        }

        public void NewTicket(Ticket ticket)
        {


           
            _Context.Tickets.Add(ticket);            
           _Context.SaveChanges();
            Ticket createTicket = _Context.Tickets.Find(ticket.TicketId);
            createTicket.BookingDate = DateTime.Now;
            Flight seatUpdate = _Context.Flights.Find(ticket.FlightId);
            seatUpdate.AvailableSeats -= ticket.SeatsBooked;
            _Context.SaveChanges();
            
        }

    }
}
