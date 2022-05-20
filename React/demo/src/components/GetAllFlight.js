import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GetAllFlight.css'



export default function GetAllFlights() {



    const baseURL = `https://localhost:44338/api/Flights`;



    const [allFlightDetails, setAllFlightDetails] = useState([]);



    //const navigate = useNavigate();

 

    useEffect(() => {

  

        axios.get(baseURL).then((response) => {



            setAllFlightDetails(response.data);

        });

    }, []);






    function deleteFlight(id) {

        axios.delete(`${baseURL}/${id}`).then((response) => {
            window.location.reload();
            setAllFlightDetails(response.data);
           
        });

    }



    return (

        <div>

            <table id='flight'>

                <thead>
<h3>All Flight Details</h3>
                    <tr>

                        <th>FlightID </th>

                        <th>Source</th>

                        <th>Destination</th>

                        <th>DepartureDateAndTime</th>

                        <th>ArrivalDateAndTime</th>

                        <th>seatCapacity</th>
                        <th>Fare</th>
                        <th>Available Seats</th>



                    </tr>

                </thead>

                <tbody>

                    {console.log(allFlightDetails)}



                    {

                        allFlightDetails.map((flight) => (

                            <tr key={flight.flightID}>
                            <td>{flight.flightID}</td>

                                <td>{flight.source}</td>

                                <td>{flight.destination}</td>

                                <td>{flight.departureDateAndTime}</td>

                                <td>{flight.arrivalDateAndTime}</td>
                                <td>{flight.seatCapacity}</td>
                                <td>{flight.fare}</td>
                                <td>{flight.availableSeats}</td>



                                {/* <td><button type='button' onClick={() => navigate('/EditUser', { state: airport })}>Edit</button></td> */}

                                 <td><button type='button' onClick={() => deleteFlight(flight.flightID)} >Delete</button></td> 
                               


                            </tr>

                        )
                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

