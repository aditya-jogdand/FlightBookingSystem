using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BookMyFlight.Interfaces;
using BookMyFlight.Models;
using BookMyFlight.DTOs;
using System.Net.Mail;

namespace FlightBookingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketService _TicketRepo;

        public TicketsController(ITicketService ticketRepo)
        {
            _TicketRepo = ticketRepo;
        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult> GetTickets()
        {
            try
            {
                var tickets = await _TicketRepo.GetAllTickets();
                return Ok(tickets);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error retrieving data from the database");
            }
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult> GetTicket(int id)
        {
            try
            {
                var ticket = await _TicketRepo.GetTicket(id);
                return Ok(ticket);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTicket(int id, [FromBody] Ticket ticket)
        {
            try
            {
                if (id != ticket.TicketId)
                {
                    return BadRequest();
                }
                await _TicketRepo.UpdateTicket(ticket);
                return Ok(ticket);
            }

            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }

        // POST: api/Tickets
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult> PostTicket(Ticket ticket)
        {
            try
            {
                var newTicket = await _TicketRepo.InsertTicket(ticket);
                if (newTicket == null)
                {
                    return BadRequest();
                }
                return Ok(ticket);
            }
            catch (Exception exp)
            {
                return BadRequest(exp);
            }
        }

   



        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTicket(int id)
        {
            try
            {
                var ticket = await _TicketRepo.DeleteTicket(id);
                if (ticket == null)
                {
                    return NotFound();
                }
                return Ok();
            }
            catch (Exception exp)
            {

                return BadRequest(exp);
            }
        }

        [HttpPost("sendticket")]
        public void SendTicket(SendTicketDto sendTicket)
        {
            string MailBody = "<html>" +
                               "<body >" +
                                       "<center>" +
                                         " <h1> WelCome To BookMyFlight</h1>" +
                                       "</center>" +
                                       "<center>" +
                                        "<table style=\"background-color:D0D3D4 ;border:10px solid #7A7573;border-radius:20px;width:350px;padding:10px\" >" +
                                       
                                         "<tr>" +
                                         " <td style = \"text - align: left;\"font-weight: bold;\" > Flight ID:" + sendTicket.flightId + "</td>" +
                                         "<tr>" +
                                         " <tr>" +
                                         " <td style = \"text - align: left;\"font-weight: bold;\" > Source:" + sendTicket.source+ "</td>" +
                                         "</tr>" +
                                         " <tr>" +
                                         "<td style =\"text - align: left; \"font-weight: bold;\" > Destination:" + sendTicket.destination+ "</td>" +
                                         " <tr>" +
                                         " <tr>" +
                                         "<td style = \"text - align: left;\"font-weight: bold;\" > Date of Travel:" + sendTicket.departureDateAndTime+ "</td>" +
                                         "</tr>" +
                                          "<tr>" +
                                         "<td style = \"text - align: left;\"font-weight: bold;\" > Arrival Time:" + sendTicket.arrivalDateAndTime+ "</td>" +
                                         " <tr>" +
                                         " <tr>" +
                                         " <td style = \"text - align: left;\"font-weight: bold;\" > Passenger Name:" + sendTicket.passengerName + "</td>" +
                                         "</tr>" +
                                         "<tr>" +
                                         "<td style = \"text - align: left;\"font-weight: bold;\" > Age:" + sendTicket.age+ "</td>" +
                                         "</tr>" +
                                         "<tr>" +
                                         "<td style =\"text - align: left; \"font-weight: bold;\" > Gender:" + sendTicket.gender + "</td>" +
                                         "</tr>" +
                                         "<tr>" +
                                         "<td style =\"text - align: left; \"font-weight: bold;\" >Number of Passengers:" + sendTicket.seatsBooked+ "</td> " +
                                         "</tr>" +
                                         "<tr>" +
                                         "<td style =\"text - align: left; \"font-weight: bold;\" >Total Fare:" + sendTicket.totalFare + "</td> " +
                                         "</tr>" +
                                    "</table>" +
                                   "</center>" +
                                "</body>"
                        + "</html>";
            string subject = "Welcome to  World.";
            string mailTitle = "Email from .Net Core App";
            string fromEmail = "Trng2@evolvingsols.com";
            string fromEmailPassword = "Cybage@#123";

            //Email & Content 
            MailMessage message = new MailMessage(new MailAddress(fromEmail, mailTitle), new MailAddress(sendTicket.email));
            message.Subject = subject;
            message.Body = MailBody;
            message.IsBodyHtml = true;



            SmtpClient smtp = new SmtpClient();

            smtp.Host = "webmail.evolvingsols.com";
            smtp.Port = 25;
            smtp.EnableSsl = false;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;

            System.Net.NetworkCredential credentials = new System.Net.NetworkCredential();
            credentials.UserName = fromEmail;
            credentials.Password = fromEmailPassword;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = credentials;

            smtp.Send(message);


        }



        [HttpPost("newticket")]
        public void NewTicket(Ticket ticket)
        {


            _TicketRepo.NewTicket(ticket);



        }

    }
}
