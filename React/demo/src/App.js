import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import BoardUser from "./components/BoardUser";
import BoardAdmin from "./components/BoardAdmin";
import Search from "./components/Search";
import SearchResult from "./components/SearchResults";
import CheckoutPassenger from "./components/CheckoutPassenger";
import Payment from "./components/Payment";
import Ticket from "./components/Ticket";
import Bookings from "./components/Bookings";
import BankDetails from "./components/BankDetails";
import AddNewFlight from "./components/AddFlight";
import AllFlights from "./components/AllFlights";
import AllBookings from "./components/AllBookings";
import AirportList from "./components/AirportList";
import AllUsers from "./components/AllUsers";
import AddAirport from "./components/AddAirport";
import AddBankDetails from "./components/AddBankDetails";


const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user.role.includes("ROLE_USER"));
      setShowAdminBoard(user.role.includes("ROLE_ADMIN"));
    }
  }, []);
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
      <nav id="nav" className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
       <div className="btn btn-primary">
                  BookMyFlight
                  </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
               
             
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
           
            <ul className="nav nav-pills mx-auto">
           
           
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              {showAdminBoard && (
                <div className="nav nav-pills ml-auto">
                  <li className="nav-item">
                    <Link to={"/admin"} className="nav-link">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/allbookings"} className="nav-link">
                      All Bookings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/allflight"} className="nav-link">
                      All Flights
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/airports"} className="nav-link">
                      All Airports
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/users"} className="nav-link">
                      All Users
                    </Link>
                  </li>
                </div>
              )


              }
              {currentUser && (
                <div className="nav nav-pills ml-auto">
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/bookings"} className="nav-link">
                      Bookings
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/bank"} className="nav-link">
                      Bank Details
                    </Link>
                  </li>
                </div>
              )}
              {currentUser || showAdminBoard ? (

                //profile avatar part

                <div className="nav nav-pills ml-auto">
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="nav nav-pills ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}

            </ul>
          </div>
        </div>
      </nav>
     
      


      <div className="bg container mt-3">
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/home" element={<Search />} />
          <Route path="/searchresult" element={<SearchResult />} />
          <Route path="/checkoutpassenger" element={<CheckoutPassenger />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/allbookings" element={<AllBookings />} />
          <Route path="/bank" element={<BankDetails />} />
          <Route path="/addbankdetails" element={<AddBankDetails />} />
          <Route path="/allflight" element={<AllFlights />} />
          <Route path="/airports" element={<AirportList />} />
          <Route path="/addairport" element={<AddAirport />} />
          <Route path="/users" element={<AllUsers />} />

          <Route path="/addflight" element={<AddNewFlight />} />


          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>
      <footer class="footer mt-auto py-3">
  <div class="container text-center">
    <span class="text-muted">Developed By .NET+React Group No.1</span>
  </div>
</footer>

    </div>
  );
};
export default App;