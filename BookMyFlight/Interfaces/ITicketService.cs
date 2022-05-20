using BookMyFlight.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookMyFlight.Interfaces
{
    public interface ITicketService
    {
        Task<List<Ticket>> GetAllTickets();
        Task<Ticket> GetTicket(int id);
        Task<Ticket> InsertTicket(Ticket ticket);
        Task<Ticket> UpdateTicket(Ticket ticket);
        Task<Ticket> DeleteTicket(int id);
        void NewTicket(Ticket ticket);
    }
}
