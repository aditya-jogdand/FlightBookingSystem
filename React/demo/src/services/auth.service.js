import axios from "axios";
const API_URL = "https://localhost:44396/api/account/";
const getBaseURL = () =>{ return "https://localhost:44396/api/"}
const register = (Firstname, Lastname, Email, Password, Contact) => {
  return axios.post(API_URL + "register", {
    Firstname,
    Lastname,
    Email,
    Password,
    Contact
  });
};
const login = (Email, Password) => {
  return axios
    .post(API_URL + "login", {
      Email,
      Password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getCurrentPassenger = () =>{
  return JSON.parse(sessionStorage.getItem("passenger"))
}

const getCurrentFlightData = () =>{
  return JSON.parse(sessionStorage.getItem("flight"))
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getCurrentPassenger,
  getBaseURL,
  getCurrentFlightData
};
export default AuthService;