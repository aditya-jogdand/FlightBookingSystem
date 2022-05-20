import axios from "axios";
import { useState } from "react";
import AuthService from "../services/auth.service";

const AllBookings = () =>{

    const [booking,setBooking]=useState([])
    
   const user = AuthService.getCurrentUser()

axios.get('https://localhost:44396/api/Tickets').then((response)=>{
    setBooking(response.data)

})



    return(
        <div>
            <div className="card">
<h1 className="text-center mb-3">All Bookings</h1>


            <table class="table table-hover text-center">
         <thead>
    <tr>
      
      <th scope="col">Ticket ID</th>
      <th scope="col">Passenger Name</th>
      <th scope="col">Seats Booked </th>
      <th scope="col">Booking Date</th>
      <th scope="col">Total Fare</th>
      
      
    </tr>
  </thead>
  <tbody>
{booking.slice().reverse().map((bookings) =>(
   
   <tr>
     
     <td >{bookings.ticketId}</td>
        <td > {bookings.passengerName}</td>
        <td > {bookings.seatsBooked}</td>
        <td > {bookings.bookingDate}</td>
        <td > {bookings.totalFare}</td>    
        
   </tr>
   
   
  
))}</tbody></table>
        </div>
        </div>
    )
}

export default AllBookings;