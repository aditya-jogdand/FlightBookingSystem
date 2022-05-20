import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "../services/auth.service";




const SearchResult = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const flightData = location.state
    //console.log(userdata);
    const user = AuthService.getCurrentUser();
    const validateLogin = (specificflightdata) => {
        if (user) {
            navigate("/checkoutpassenger", specificflightdata)

        }
        else {
            toast("Please Login To Book Ticket", {
                className: "custom-toast",
                draggable: false,
                position: toast.POSITION.TOP_CENTER
            })
        }
    }
    return (
        <div>
            <ToastContainer />
             <div className="card">
            
            <h1 className="text-center">Search Results</h1>

            {flightData.length ?
                flightData.map((flight) => (

                    <div className="card" key={flight.flightId}>

                        <div className="row card-body">
                            <h5 className="card-title col-md-6">From : {flight.source}</h5>
                            <h5 className="card-title col-md-6">To : {flight.destination}</h5>
                            <h5 className="card-title col-md-6">Date : {flight.departureDateAndTime}</h5>
                            <h5 className="card-title col-md-6">Seats Available : {flight.availableSeats}</h5>
                            <h5 className="card-title col-md-6">Price : {flight.fare}</h5>
                            <button className="btn btn-primary col-md-2" onClick={() => validateLogin({ state: flight })}>Book Now</button>

                        </div>
                    </div>
                )) : (<div><h2 className="text-center">No Filghts Available</h2></div>)}
        </div>
        </div>
    )
}

export default SearchResult;