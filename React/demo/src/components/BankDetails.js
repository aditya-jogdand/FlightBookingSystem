import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import AuthService from "../services/auth.service"

const BankDetails = () => {

const [bank,setbank]=useState([])
const user = AuthService.getCurrentUser()
const navigate = useNavigate()

axios.get('https://localhost:44396/api/BankDetails').then((response)=>{
    setbank(response.data)
})

const handleOnClick =() =>{
    navigate("/addbankdetails")
}

    return (
        <div>
 <h1 className="text-center">Bank Details</h1>
<div className="text-center mt-4"><button className="btn btn-primary"onClick={()=>handleOnClick()} >Add New Bank Details</button></div>
{bank.map((bankDetail) =>{
    if(bankDetail.userId === user.userID){
    return  <div className="card" key={bankDetail.bankDetailsId}>

    <div className="card-body">
        <h5 className="card-title">Bank Name : {bankDetail.bankName}</h5>
        <h5 className="card-title">Account Number : {bankDetail.accountNumber}</h5>
        <h5 className="card-title">IFSC : {bankDetail.ifsC_Code}</h5>
               
       
    </div>
    </div>
    }
   
    return null
})}
        </div>
    )
}

export default BankDetails