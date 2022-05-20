
import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import BankService from "../services/bank.service";
import { useNavigate } from "react-router-dom";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const AddBankDetails = () => {
  const form = useRef();
  const checkBtn = useRef();
  
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifsc_Code, setIFSC_Code] = useState("");
 
const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

const navigate = useNavigate();


  const onChangeBankName = (e) => {
    const bankName = e.target.value;
    setBankName(bankName);
  };
 
  const onChangeAccountNumber = (e) => {
    const accountNumber = e.target.value;
    setAccountNumber(accountNumber);
  };
  const onChangeIFSC_Code = (e) => {
    const ifsc_Code = e.target.value;
    setIFSC_Code(ifsc_Code);
  };

  
  const handleAddBankDetails = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      BankService.addBankDetails(bankName,accountNumber,ifsc_Code).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          console.log(response.data)
          navigate("/bank")
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
       <div className="card">
    <h1 className="text-center mt-2 mb-4">Add New Bank Details</h1>
        <Form onSubmit={handleAddBankDetails} ref={form}>
          {!successful && (
            <div>
              <div className="col justify-content-center">
              <div className="form-group col-md-6">
                <label htmlFor="bankName">Bank Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="bankName"
                  value={bankName}
                  onChange={onChangeBankName}
                  validations={[required]}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="accountNumber">Account Number</label>
                <Input
                  type="text"
                  className="form-control"
                  name="accountNumber"
                  value={accountNumber}
                  onChange={onChangeAccountNumber}
                  validations={[required]}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="ifsc_Code">IFSC_Code</label>
                <Input
                  type="text"
                  className="form-control"
                  name="ifsc_Code"
                  value={ifsc_Code}
                  onChange={onChangeIFSC_Code}
                  validations={[required]}
                />
              </div>

              

              
             
              </div>
              <div className="form-group col-md-3 mt-3">
                <button className="btn btn-primary">Add Bank Details</button>
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
export default AddBankDetails;