using BookMyFlight.Interfaces;
using BookMyFlight.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ECommerce.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IAppUserService _userService;
      


        string MailBody = "<!DOCTYPE html>" +
                               "<html> " +
                                   "<body style=\"background -color:#ff7f26;text-align:center;\"> " +
                                   "<h1 style=\"color:#051a80;\">Welcome to BookMyFlight</h1> " +

                                   "<label style=\"color:orange;font-size:100px;border:5px dotted;border-radius:50px\">N</label> " +
                                   "</body> " +
                               "</html>";
        string subject = "Welcome to BookMyFlight";
        string mailTitle = "Email from .Net Core App";
        string fromEmail = "Trng2@evolvingsols.com";
        string fromEmailPassword = "Cybage@#123";

        public UserController(IAppUserService userService)
        {
            _userService = userService;
            
        }

        /// <summary>
        /// Get the count of item in the shopping cart
        /// </summary>
        /// <param name="userId"></param>
        /// <returns>The count of items in shopping cart</returns>
        //[HttpGet("{userId}")]
        //public int Get(int userId)
        //{
        //    int cartItemCount = _cartService.GetCartItemCount(userId);
        //    return cartItemCount;
        //}

        /// <summary>
        /// Check the availability of the username
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        //[HttpGet]
        //[Route("validateUserName/{userName}")]
        //public bool ValidateUserName(string userName)
        //{
        //    return _userService.CheckUserAvailabity(userName);
        //}

        /// <summary>
        /// Register a new user
        /// </summary>
        /// <param name="userData"></param>
        [HttpPost("test")]
        public void Post([FromBody] AppUser userData)
        {
            _userService.InsertUser(userData);

            //Email & Content 
            MailMessage message = new MailMessage(new MailAddress(fromEmail, mailTitle), new MailAddress(userData.UserEmail));
            message.Subject = subject;
            message.Body = MailBody;
            message.IsBodyHtml = true;

            //Attachment data = new Attachment("D:\\MIni_Project\\images\\post.png");
            //message.Attachments.Add(data);

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

            ViewBag.EmailSentMessage = "Email sent successfully";

        }


    }
}
