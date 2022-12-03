import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import {Container} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import { BsLockFill } from "react-icons/bs";
import "./Login.css";
import  HomeNavBar from "../navbars/HomeNavBar"
import { useNavigate } from "react-router-dom";
const ResetPassword = () => {
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate("/login")
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
          />
          <Button className="login__button " 
          type="submit" 
          block color="primary"
          style={{marginLeft:"110px"}}>
            Reset Password
          </Button>
          
        </form>
      </div>
    </Container>
    </>
  );
}
 
export default ResetPassword;