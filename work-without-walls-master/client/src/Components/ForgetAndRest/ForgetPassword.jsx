import React,{ useState }from "react";
import TextField from "@material-ui/core/TextField";
import Button from "react-bootstrap/Button";
import {Container} from "@mui/material";
import Avatar from "@material-ui/core/Avatar";
import { BsLockFill } from "react-icons/bs";
import Loading from "../Loading";
import "./Login.css";
import  HomeNavBar from "../navbars/HomeNavBar"
import { useNavigate } from "react-router-dom";
import axios from "axios"
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setNewemail] = useState("");
  // var mail_format = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
  const onSubmit = () => {
    if(email==" "){
    alert("Enter email to reset")
    setIsLoading(false);
    }
    else{
      axios
        .put("/fr/forgotpass", {
          email:email
        })
        .then((res) => {
          setIsLoading(true);
          alert("Chcek Your mail");
          navigate("/login")
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
      
    }
  };
  return (  
    <>
    <HomeNavBar/>
    {isLoading && <Loading />}
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
                  Forget Password
              </h1>
            </div>
        </div>
       
         <form>
        
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            type="email"
            name="email"
            onChange={(e) => setNewemail(e.target.value)}
          />
           {/* {<span className="span">Enter a valid email</span>} */}
          <Button className="login__button " 
          block color="primary"
          style={{marginLeft:"110px"}}
          onClick={onSubmit}>
            {isLoading ? "Loading ..." : " Reset Password"}
          </Button>
          
        </form>
      </div>
    </Container>
    </>
  );
}
 
export default ForgetPassword;