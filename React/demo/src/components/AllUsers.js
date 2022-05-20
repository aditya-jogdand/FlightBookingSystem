import axios from "axios";
import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";

const AllUsers = () =>{

    const [user,setUser]=useState([])
    
   const users = AuthService.getCurrentUser()

   useEffect(()=>{
    getUsers()
       },[])

const getUsers = () => {
    axios.get('https://localhost:44396/api/AppUsers').then((response)=>{
    setUser(response.data)

})
}

const deleteUser =(id)=>{
    axios.delete(`https://localhost:44396/api/AppUsers/${id}`).then((response)=>{
        getUsers()
})
}
    return(
        <div>
            <div className="card">
<h1 className="text-center mb-3">All Users</h1>


            <table class="table table-hover text-center">
         <thead>
    <tr>
      
      <th scope="col">User ID</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Contact</th>
      <th scope="col">Created Date and Time</th>
      <th scope="col">Role</th>
      <th scope="col">Actions</th>
      
    </tr>
  </thead>
  <tbody>
{user.slice().reverse().map((users) =>(
   
   <tr key={users.userId}>
     
     <td >{users.userId}</td>
        <td > {users.firstName}</td>
        <td > {users.lastName}</td>
        <td > {users.userEmail}</td>
        <td > {users.contact}</td>    
        <td > {users.dateCreated}</td>    
        <td > {users.role}</td>    
        <td > <button className="btn btn-danger" onClick={()=>deleteUser(users.userId)}>Delete</button></td>
   </tr>
   
   
  
))}</tbody></table>
        </div>
        </div>
    )
}

export default AllUsers;