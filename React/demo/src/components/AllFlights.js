import axios from "axios";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";


const AllFlights = () =>{

    const [flight,setFlight]=useState([])
    

   const navigate = useNavigate()

axios.get('https://localhost:44396/api/Flights').then((response)=>{
    setFlight(response.data)

})

const handleOnClick =() =>{
    navigate("/addflight")
}

    return(
        <div>
            <div className="card">
<h1 className="text-center">All Flights</h1>

<div className="my-4 text-center">
                <button onClick={()=>handleOnClick()} className="btn btn-primary">
                    Add New Flight
                </button>
            </div>
            <table class="table table-hover text-center">
         <thead>
    <tr>
      
      <th scope="col">Flight ID</th>
      <th scope="col">Source</th>
      <th scope="col">Destination</th>
      <th scope="col">Departure Date and Time</th>
      <th scope="col">Arrival Date and Time</th>
      <th scope="col">Seat Capacity</th>
      <th scope="col">Available Seats</th>
      <th scope="col">Fare</th>
      
      
    </tr>
  </thead>
  <tbody>
{flight.slice().reverse().map((flights) =>(
   
   <tr>
     
     <td >{flights.flightId}</td>
        <td > {flights.source}</td>
        <td > {flights.destination}</td>
        <td > {flights.departureDateAndTime}</td>
        <td > {flights.arrivalDateAndTime}</td>
        <td > {flights.seatCapacity}</td>
        <td > {flights.availableSeats}</td>
        <td > {flights.fare}</td>
        
   </tr>
   
   
  
))}</tbody></table>
        </div>
        </div>
    )
}

export default AllFlights;