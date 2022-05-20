import axios from "axios";
import AuthService from "./auth.service";
const API_URL = "https://localhost:44396/api/";



const addBankDetails = (bankName,accountNumber,ifsC_Code) => {
  return axios.post(API_URL + "BankDetails", {
    bankName,accountNumber,ifsC_Code

  }
  );
};


const BankService = {
  addBankDetails
};
export default BankService;