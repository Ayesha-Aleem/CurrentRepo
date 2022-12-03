import React,{useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import {Container} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import { BsLockFill } from "react-icons/bs";
import "./Login.css";
import  HomeNavBar from "../navbars/HomeNavBar"
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const {resetLink}=useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setNewPassword] = useState("");
  const [link, setNewLink] = useState("");
  const onSubmit = () => {
    if(password===" "){
     alert("Enter password to recover")
     setIsLoading(false)
    }
    else{
      axios.put("/fr/reset",{
        resetLink,
        newPass:password})
      setIsLoading(true)
      alert("Update Successfully")
      navigate("/login")

    }
  };
  return (  
    <>
    <HomeNavBar/>
    <Container maxWidth="xs">
     
      <div className="login__form">
        <div className="row d-flex justify-content-center">
          <div className="col col-2  d-flex justify-content-end">
          <Avatar>
            < BsLockFill />
          </Avatar>
          </div >
            <div className="col col-10 d-flex justify-content-start">
              <h1 className="h11"> 
                  Reset Password
              </h1>
            </div>
        </div>
       
         <form>
        
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            name="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button className="login__button " 
          type="submit" 
          block color="primary"
          onClick={onSubmit}
          style={{marginLeft:"110px"}}>
            {isLoading ? "Loading ..." : " Reset Password"}
          </Button>
          
        </form>
      </div>
    </Container>
    </>
  );
}
 
export default ResetPassword;