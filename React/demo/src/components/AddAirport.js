import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AirportService from "../services/airport.service";
import {  useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const AddAirport = () => {
  const form = useRef();
  const checkBtn = useRef();
  const [airportName, setAirportName] = useState("");
  const [airportCode, setAirportCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
 
const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

const navigate=useNavigate()

  const onChangeAirportName = (e) => {
    const airportName = e.target.value;
    setAirportName(airportName);
  };
 
  const onChangeairportCode = (e) => {
    const airportCode = e.target.value;
    setAirportCode(airportCode);
  };
  const onChangeCity = (e) => {
    const city = e.target.value;
    setCity(city);
  };

  const onChangeState = (e) => {
    const state = e.target.value;
    setState(state);
  };
  
  const handleAddAirport = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AirportService.addAirport(airportName,airportCode,city,state).then(
        (response) => {
            toast.success("Airport Added Successfully",{
                className:"custom-toast",
                draggable:false,
                position: toast.POSITION.TOP_CENTER
            })
          setMessage(response.data.message);
          setSuccessful(true);
         navigate("/airports")
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
        <ToastContainer/>
    <div className="card">
    <h1 className="text-center mt-2 mb-4">Add New Airport</h1>
     
        <Form onSubmit={handleAddAirport} ref={form}>
          {!successful && (
            <div>
                 <div className="row justify-content-center ">
              <div className="form-group col-md-5">
                <label htmlFor="airportName">Airport Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="airportName"
                  value={airportName}
                  onChange={onChangeAirportName}
                  validations={[required]}
                />
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="airportCode">Airport Code</label>
                <Input
                  type="text"
                  className="form-control"
                  name="airportCode"
                  value={airportCode}
                  onChange={onChangeairportCode}
                  validations={[required]}
                />
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="city">City</label>
                <Input
                  type="text"
                  className="form-control"
                  name="city"
                  value={city}
                  onChange={onChangeCity}
                  validations={[required]}
                />
              </div>

              <div className="form-group col-md-5">
                <label htmlFor="state">State</label>
                <Input
                  type="text"
                  className="form-control"
                  name="state"
                  value={state}
                  onChange={onChangeState}
                  validations={[required]}
                />
              </div>

              
             
            </div>
            <div className="form-group col-md-12 text-center mt-4">
                <button className="btn btn-primary btn-block">Add Airport</button>
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
export default AddAirport;