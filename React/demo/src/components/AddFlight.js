import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import FlightService from "../services/flight.service";
import axios from "axios";
import {  useNavigate } from "react-router-dom";



const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const AddNewFlight = () => {


  const form = useRef();
  const checkBtn = useRef();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDateAndTime, setDepartureDateAndTime] = useState("");
  const [arrivalDateAndTime, setArrivalDateAndTime] = useState("");
  const [seatCapacity, setSeatCapacity] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [fare, setFare] = useState("");
const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [airport, setAirport] = useState([])

const navigate = useNavigate()

  useEffect(() => listAirport(), [])
const listAirport = () => {
    axios.get('https://localhost:44396/api/Airports').then((res) => {
        console.log(res.data)
        setAirport(res.data)
    })
}
  const onChangeSource = (e) => {
    const source = e.target.value;
    setSource(source);
  };
 
  const onChangeDestination = (e) => {
    const destination = e.target.value;
    setDestination(destination);
  };
  const onChangeDepartureDateAndTime = (e) => {
    const departureDateAndTime = e.target.value;
    setDepartureDateAndTime(departureDateAndTime);
  };

  const onChangeArrivalDateAndTime = (e) => {
    const arrivalDateAndTime = e.target.value;
    setArrivalDateAndTime(arrivalDateAndTime);
  };
  const onChangeSeatCapacity = (e) => {
    const seatCapacity = e.target.value;
    setSeatCapacity(parseInt(seatCapacity));
  };

  const onChangeAvailableSeats = (e) => {
    const availableSeats = e.target.value;
    setAvailableSeats(parseInt(availableSeats));
  };
  const onChangeFare = (e) => {
    const fare = e.target.value;
    setFare(parseInt(fare));
  };

  const handleAddFlight = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      FlightService.addFlight(source,destination,departureDateAndTime,arrivalDateAndTime,seatCapacity,availableSeats,fare).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          console.log(response);
          navigate("/allflight")
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };
  return (
    <div>
    <div className="card">
    <h1 className="text-center mt-2 mb-4">Add New Flight</h1>

   
        <Form onSubmit={handleAddFlight} ref={form}>
          {!successful && (
            <div>
            <div className="row justify-content-center ">
              
              <div className="form-group col-md-5">
                <label htmlFor="source">Source</label>
                {/* <Input
                  type="text"
                  className="form-control"
                  name="source"
                  value={source}
                  onChange={onChangeSource}
                  validations={[required]}
                /> */}
                 <select class="form-select" aria-label="Default select example" onChange={onChangeSource}>
                            <option selected value="">Select Source Airport</option>
                            {airport.map((air) => (
                                <option key={air.airportId} value={air.airportName} >{air.airportName}</option>
                            ))}

                        </select>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="destination">Destination</label>
                {/* <Input
                  type="text"
                  className="form-control"
                  name="destination"
                  value={destination}
                  onChange={onChangeDestination}
                  validations={[required]}
                /> */}
                 <select class="form-select" aria-label="Default select example" onChange={onChangeDestination}>
                            <option selected value="">Select Destination Airport</option>
                            {airport.map((air) => (
                                <option key={air.airportId} value={air.airportName} >{air.airportName}</option>
                            ))}

                        </select>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="departureDateAndTime">Departure Date And Time</label>
                <Input
                  type="datetime-local"
                  className="form-control"
                  name="departureDateAndTime"
                  value={departureDateAndTime}
                  onChange={onChangeDepartureDateAndTime}
                  min={new Date().toISOString().slice(0, 16)}
                  validations={[required]}
                />
              </div>

              <div className="form-group col-md-5">
                <label htmlFor="arrivalDateAndTime">Arrival Date And Time</label>
                <Input
                  type="datetime-local"
                  className="form-control"
                  name="arrivalDateAndTime"
                  value={arrivalDateAndTime}
                  min={new Date().toISOString().slice(0, 16)}
                  onChange={onChangeArrivalDateAndTime}
                  validations={[required]}
                />
              </div>

              <div className="form-group col-md-5">
                <label htmlFor="seatCapacity">Seat Capacity</label>
                <Input
                  type="number"
                  className="form-control"
                  name="seatCapacity"
                  value={seatCapacity}
                  onChange={onChangeSeatCapacity}
                  validations={[required]}
                />
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="availableSeats">Available Seats</label>
                <Input
                  type="number"
                  className="form-control"
                  name="availableSeats"
                  value={availableSeats}
                  onChange={onChangeAvailableSeats}
                  validations={[required]}
                />
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="fare">Fare</label>
                <Input
                  type="number"
                  className="form-control"
                  name="fare"
                  value={fare}
                  onChange={onChangeFare}
                  validations={[required]}
                />
              </div>
              </div>
              <div className="form-group col-md-12 text-center mt-4">
                <button className="btn btn-primary btn-block">Add Flight</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={ successful ? "alert alert-success" : "alert alert-danger" }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
      </div>
  
  );
};
export default AddNewFlight;