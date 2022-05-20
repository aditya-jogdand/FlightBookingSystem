import axios from "axios";
const API_URL = "https://localhost:44396/api/Flights/";
const SearchFlight = (source, destination, departureDateTime, availableSeats) => {
  return axios.get(API_URL + "search", {
    source, destination, departureDateTime, availableSeats
  });
};

const addFlight = (source, destination, departureDateAndTime, arrivalDateAndTime, seatCapacity, availableSeats, fare) => {
  return axios.post(API_URL, {
    source, destination, departureDateAndTime, arrivalDateAndTime, seatCapacity, availableSeats, fare

  }
  );
};


const FlightService = {
    SearchFlight,
    addFlight
  };

export default FlightService;