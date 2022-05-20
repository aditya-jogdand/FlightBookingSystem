import axios from "axios";
import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [details,setDetails]=useState([])
  const user = AuthService.getCurrentUser()
  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  axios.get('https://localhost:44396/api/AppUsers').then((response)=>{
    setDetails(response.data)
  })
  


  return (
    <div>
      <div className="card">
    <h1 className="text-center">User Profile</h1>
 
 {details.map((detail) =>{
     if(detail.userId === user.userID){
     return  <div key={detail.userId}>

     <div className="row card-body">
         <h5 className="card-title">First Name : {detail.firstName}</h5>
         <h5 className="card-title">Last Name : {detail.lastName}</h5>
         <h5 className="card-title">Email : {detail.userEmail}</h5>
         <h5 className="card-title">Contact : {detail.contact}</h5>
            </div>    
        
     </div>
 
     }
    
     return null
 })}
     </div>
     </div>
   );
}

export default BoardAdmin;