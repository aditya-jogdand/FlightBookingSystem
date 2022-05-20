
import AuthService from '../services/auth.service';
import image from "../images/barcode.png";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';


const Ticket = () => {

    const ticketData = AuthService.getCurrentPassenger();
    const flightData = AuthService.getCurrentFlightData();
    const user = AuthService.getCurrentUser();

    sessionStorage.removeItem("passenger");
    sessionStorage.removeItem("flight");
  

    // console.log(ticketData)
    // console.log(flightData)

let data = {
    flightID: flightData.flightId,
    source : flightData.source,
    destination : flightData.destination,
    email : user.email,
    departureDateAndTime :flightData.departureDateAndTime,
    arrivalDateAndTime :flightData.arrivalDateAndTime,
    passengerName : ticketData.passengerName,
    age : ticketData.age,
    gender : ticketData.gender,
    seatsBooked : ticketData.seatsBooked,
    totalFare : ticketData.totalFare
}

console.log(data)

const onButtonClick =()=>{
    axios.post('https://localhost:44396/api/Tickets/sendticket',data).then((response)=>{
     
        toast.success("Ticket Sent To Your Registered Email",{
            className:"custom-toast",
        draggable:false,
        position: toast.POSITION.TOP_CENTER
          })  


    })}


    return (
     <div>
         <ToastContainer/>
        <div class="card" style={{width: "25rem",backgroundColor:"white"}}>
  
  <div class="row card-body"> 
    <h2 class="card-title text-center">Ticket</h2>
    <hr/>
   <div className='col-md-6'>
   <h4 >From</h4>

   <h5 >{flightData.source}</h5>
   </div>
   <div className='col-md-6'>
   <h4 >To</h4>

   <h5 >{flightData.destination}</h5>
   </div>
   <div className='col-md-6'>
   <h4 >Date and Time</h4>

   <h5 >{flightData.departureDateAndTime}</h5>
   </div>
   <div className='col-md-6'>
   <h4 >Passenger Name</h4>

   <h5 >{ticketData.passengerName}</h5>
   </div>
   <div className='col-md-6'>
   <h4 >Total Passengers</h4>

   <h5 >{ticketData.seatsBooked}</h5>
   </div>
   

    <img src={image} class="card-img-top" style={{maxHeight:"100px",maxWidth:"150px"}} alt=''/>
  </div>
</div>
<div className="form-group col-md-12 text-center mt-4">
                <button className="btn btn-primary btn-block" onClick={()=>onButtonClick()}>Send Ticket To Email</button>
              </div>
     </div>
    )
}

export default Ticket;
