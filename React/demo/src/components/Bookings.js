import axios from "axios";
import { useState } from "react";
import AuthService from "../services/auth.service";

const Bookings = () =>{

    const [booking,setBooking]=useState([])
    
   const user = AuthService.getCurrentUser()

axios.get('https://localhost:44396/api/Tickets').then((response)=>{
    setBooking(response.data)

})



    return(
        <div>
            <div className="card">
<h1 className="text-center">Booking History</h1>

{booking.slice().reverse().map((bookings) =>{
    if(bookings.userId === user.userID){
    return  <div className="card" key={bookings.ticketId}>

    <div className="row card-body text-center">
        <h5 className="card-title col-md-4">Ticket ID : {bookings.ticketId}</h5>
        <h5 className="card-title col-md-4">Passenger Name : {bookings.passengerName}</h5>
        <h5 className="card-title col-md-4">Seats Booked : {bookings.seatsBooked}</h5>
        <h5 className="card-title col-md-4">Booking Date : {bookings.bookingDate}</h5>
        <h5 className="card-title col-md-4">Total Fare : {bookings.totalFare}</h5>
       
       
    </div>
    </div>
    }
   
    return null
})}
        </div>
        </div>
    )
}

export default Bookings;