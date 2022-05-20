using BookMyFlight.DTOs;
using BookMyFlight.Interfaces;
using BookMyFlight.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BookMyFlight.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {

        private readonly ApplicationDbContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(ApplicationDbContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }


    

        [HttpPost("register")]
            public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
            {
                if (await UserExists(registerDto.Email)) return BadRequest("Email Is Already Taken");
                var hmac = new HMACSHA512();

                var user = new AppUser
                {
                    FirstName = registerDto.Firstname,
                    LastName = registerDto.Lastname,
                    UserEmail = registerDto.Email.ToLower(),
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                    PasswordSalt = hmac.Key,
                    Contact = registerDto.Contact,
                    IsUserDeleted = false,
                    DateCreated = DateTime.Now,
                    Role = "ROLE_USER"

                    //add extra feilds required for registration

               

        };

                _context.appUsers.Add(user);


                await _context.SaveChangesAsync();
            string MailBody = "<!DOCTYPE html>" +
                            "<html> " +
                                "<body style=\"background -color:#ff7f26;text-align:center;\">" +
                                "<h1 style=\"color:#051a80;\">Welcome to BookMyFlight</h1> " +
                                "<h2 style=\"color:#051a80;\"> Your Credentials is : " + registerDto.Email + "</h2> " +
                                "<h2 style=\"color:#051a80;\"> Your Password is : " + registerDto.Password + "</h2> " +
                                "<label style=\"color:orange;font-size:100px;border:5px dotted;border-radius:50px\"></label> " +
                                "</body> " +
                            "</html>";
            string subject = "Welcome to  World.";
            string mailTitle = "Email from .Net Core App";
            string fromEmail = "";
            string fromEmailPassword = "";

            //Email & Content 
            MailMessage message = new MailMessage(new MailAddress(fromEmail, mailTitle), new MailAddress(registerDto.Email));
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

            ViewBag.EmailSentMessage = "Email sent successfully";

            return new UserDto
                {
                    Email = user.UserEmail,
                    Token = _tokenService.CreateToken(user)
                };
            }



            private async Task<bool> UserExists(string username)
            {
                return await _context.appUsers.AnyAsync(x => x.UserEmail == username.ToLower());
            }

            [HttpPost("login")]
            public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
            {
                var user = await _context.appUsers
                    .SingleOrDefaultAsync(x => x.UserEmail == loginDto.Email);

                if (user == null) return Unauthorized("Invalid UserName");

                var hmac = new HMACSHA512(user.PasswordSalt);

                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");
                }

                return new UserDto
                {
                    Email = user.UserEmail,
                    Token = _tokenService.CreateToken(user),
                    Role = user.Role,
                    UserID = user.UserId                   
                };


            }
        }
}
