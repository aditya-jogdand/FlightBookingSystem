import axios from "axios";
const API_URL = "https://localhost:44396/api/";
const addAirport = (airportName,airportCode,city,state) => {
  return axios.post(API_URL + "Airports", {
    airportName,airportCode,city,state

  }
  );
};


const AirportService = {
  addAirport
};
export default AirportService;