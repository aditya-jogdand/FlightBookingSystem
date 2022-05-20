import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const CheckoutPassenger = () => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [age, setAge] = useState("");
    const [seats, setSeats] = useState("");
    const user = AuthService.getCurrentUser()
    const location = useLocation();
    const flightData = location.state
    const navigate = useNavigate();
  




    const addPassenger = () => {
        let data = {
            passengerName: name,
            gender: gender,
            age: parseInt(age),
            seatsBooked: parseInt(seats),
            flightId: flightData.flightId,
            totalFare: parseInt(flightData.fare * seats),
           
            userId: user.userID

        };

      
        sessionStorage.setItem('passenger', JSON.stringify(data))
        sessionStorage.setItem('flight', JSON.stringify(flightData))
        navigate("/payment")

        // send the data to the API


    };



    console.log(flightData)
    return (
        // <div key={flightData.flightId}>
        //     hello
        //  <p>{flightData.source}</p>
        // </div>
        <div>
            <div className="card">
            <h1 className="text-center mt-2 mb-4">Add Passenger Details</h1>

            <div className="row justify-content-center">
                <div className="col-md-4">
                    <label htmlFor="">Full Name</label>

                    <input
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        type="text"
                        placeholder="Please Enter Your Full Name"
                        className="form-control"
                    />
                </div>

                <div className="col-md-2">
                    <label> Gender :</label>
                    <select className="form-select"
                        name="gender"
                        onChange={(e) => {
                            setGender(e.target.value);
                        }}
                    >

                        <option selected value="">Select Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>


                <div className="col-md-2">
                    <label htmlFor="Age">Age</label>

                    <input
                        onChange={(e) => {
                            setAge(e.target.value);
                        }}
                        type="number"
                        placeholder="Enter Passenger's Age"
                        className="form-control"
                        min={12}
                    />
                </div>

                <div className="col-md-3">
                    <label htmlFor="Passengers">Passengers</label>

                    <select className="form-select"
                        name="gender"
                        onChange={(e) => {
                            setSeats(e.target.value);
                        }}
                    >

                        <option selected value="">Select Number of Passengers</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className="mt-5 col-md-3 text-center">
                <button onClick={addPassenger} className="btn btn-primary btn-lg">
                    Continue
                </button>
            </div>
            </div>

            <br></br>

           
        </div>
        </div>
    );
};


export default CheckoutPassenger;