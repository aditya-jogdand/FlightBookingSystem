import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


const Search = () => {
    const [source, setSource] = useState('')
    const [destination, setDestination] = useState('')
    const [departureDateAndTime, setDepartureDateAndTime] = useState('')
    const [airport, setAirport] = useState([])
   
   

    const navigate = useNavigate();

    useEffect(() => listAirport(), [])
    const listAirport = () => {
        axios.get('https://localhost:44396/api/Airports').then((res) => {
            console.log(res.data)
            setAirport(res.data)
        })
    }
    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate());
        const mm = String(today.getMonth() + 1).padStart(2, "0"); 
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    const searchFilght = () => {
        let data = {
            source: source,
            destination: destination,
            departureDate: departureDateAndTime,

        };

    
        axios.post('https://localhost:44396/api/Flights/search', data).then((response) => {

            const temp = response.data;
            console.log(response.data)

            navigate("/searchresult", { state: temp })

        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
            <div className="card justify-content-center content-container" >
                <h1 className="page-title text-center mt-3">Search Flight</h1>

                <div className="row text-center justify-content-center">
                    <div className="col-md-3">
                        <label htmlFor="">Source</label>                
                        <select class="form-select" aria-label="Default select example" onChange={(e) => setSource(e.target.value)}>
                            <option selected value="">Select Source Airport</option>
                            {airport.map((air) => (
                                <option key={air.airportId} value={air.airportName} >{air.airportName}</option>
                            ))}

                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="">Destination</label>
                      
                        <select class="form-select" aria-label="Default select example" onChange={(e) => setDestination(e.target.value)}>
                            <option selected value="">Select Destination Airport</option>
                            {airport.map((air) => (
                                <option key={air.airportId} value={air.airportName} >{air.airportName}</option>
                            ))}

                        </select>

                    </div>
                    <div className="col-md-3">
                        <label htmlFor="departureDateAndTime">Departure Date</label>
                        <input
                            onChange={(e) => {
                                setDepartureDateAndTime(e.target.value)
                            }}
                            type="date"   
                            min={disablePastDate()}                 
                            placeholder='enter traveldate'
                            className="form-control"
                        />
                    </div>
                    <br>
                    </br>
                    <div className="mt-5 mb-3">
                        <button onClick={searchFilght} className="btn btn-primary btn-lg col-md-2" >
                            Search
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;