import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Payment = () => {

const user = AuthService.getCurrentUser();
const passenger = AuthService.getCurrentPassenger();


const navigate = useNavigate();

const data = {
    flightId: passenger.flightId,
    seatsBooked: passenger.seatsBooked,
    totalFare: passenger.totalFare,
    userId: passenger.userId,
    passengerName: passenger.passengerName,
    gender: passenger.gender,
    age: passenger.age
}

const handleOnClick = () =>{
  axios.post('https://localhost:44396/api/Tickets/newticket',data).then( (res)=>{
    sessionStorage.setItem('passenger', JSON.stringify(data))
    navigate("/ticket")
  } )
    
  
  


}


    return(
      
          <div>
              {(user && passenger)?(
        
        <div className="card">
          <h1 className="text-center">Payment Gateway</h1>

          <hr />
          <h2 className="text-center">Select Payment Mode</h2>
          <div className="form-check mt-3">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked="checked" />
            <h3 >
              PayPal
            </h3>
          </div>
          <hr />
          <div><h3>Total Amount Payable : {passenger.totalFare}</h3></div>
          <hr />
<div className="row justify-content-center">
          <button className="btn btn-primary col-md-3" onClick={()=>handleOnClick()}>Pay</button>
          </div>


        
      </div>):(<>
      <div>
          <h1>Access Denied</h1>
      </div>
      </>)
}
      </div>
      
    )
}

export default Payment;