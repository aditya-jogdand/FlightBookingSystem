import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const AirportList = () =>{

    const [airport,setAirport]=useState([])
    const navigate= useNavigate()
    
   const user = AuthService.getCurrentUser()

   useEffect(()=>{
getAirport()
   },[])

const getAirport = () => {
    axios.get('https://localhost:44396/api/Airports').then((response)=>{
        setAirport(response.data)    
})
}
const deleteAirport=(id)=>{
    axios.delete(`https://localhost:44396/api/Airports/${id}`).then((response)=>{
        getAirport()
}

    )

}



const handleOnClick =() =>{
    navigate("/addairport")
}

    return(
        <div>
            <div className="card">
<h1 className="text-center mb-2">All Airports</h1>
<div className="my-4 text-center">
                <button onClick={()=>handleOnClick()} className="btn btn-primary">
                    Add New Airport
                </button>
            </div>

            <table class="table table-hover text-center">
         <thead>
    <tr>
      
      <th scope="col">Airport ID</th>
      <th scope="col">Airport Name</th>
      <th scope="col">Airport Code </th>
      <th scope="col">City</th>
      <th scope="col">State</th>
      <th scope="col">Actions</th>
      
    </tr>
  </thead>
  <tbody>
{airport.map((airports) =>(
   
   <tr>
     
     <td >{airports.airportId}</td>
        <td > {airports.airportName}</td>
        <td > {airports.airportCode}</td>
        <td > {airports.city}</td>
        <td > {airports.state}</td>    
        <td >  <button className="btn btn-danger" onClick={()=>deleteAirport(airports.airportId)}>Delete</button></td>
   </tr>
   
   
  
))}</tbody></table>
        </div>
        </div>
    )
}

export default AirportList;