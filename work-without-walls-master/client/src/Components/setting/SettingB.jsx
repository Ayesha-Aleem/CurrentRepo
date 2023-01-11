import React,{useState} from 'react';
import SellerNavBar from '../navbars/sellerNavbar';
import { Button } from '@mui/material';
import Delete  from '@mui/icons-material/Delete';
import {SettingSchema} from "../../schema/setting"
import { Formik, Form } from "formik";
import Loading from '../Loading';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from "../../context/user.context";
import {rpass,logoutUser} from "../../api";
const SettingB = () => {
  const [fill,setfill]=useState(false)
  const navigate = useNavigate();
  const { user,setuser } = useContext(UserContext);
  const [errors, setErrors] = useState({
    hasError: false,
    message: "",
  });
  const handlesubmit = async (values) => {
    setfill(true);
    try{
        const res = await rpass(values);
        console.log(res)
        if(res?.data){
            setfill(true);
            alert("Updated")
            navigate("/profile")
        }
        else {
            setErrors({
                hasError: true,
                message: "Invalid Old password or CNIC",
              });
              setfill(false);
        }
    }
    catch(e){
        setErrors({
          hasError: true,
          message: e?.response?.data?.message,
        });
      setfill(false);
      alert("Invalid Old password or CNIC")
      }
      
  };
  const logoutUserClick = async () => {
    try {
      await logoutUser();
    } catch (e) {
      // do nothing
    }
    localStorage.removeItem("user");
    setuser(null);
    navigate("/login");
  };
  const deleteUser = (id) => {
    axios
      .delete(`/pass/delete-user/${user._id}`)
      .then((res) => {
        console.log(res.data);
       navigate("/login");
       logoutUserClick();
      })
      .catch((err) => console.log(err));
  };
    return ( 
    <>
        <SellerNavBar/>
        { fill && <Loading />}
            <div className="mt-5 text-justify text-center ">
                 <Button  
                 color="error" 
                 variant="outlined" 
                 sx={{width:300,padding:2,margin:2}}
                 type="button" 
                 data-toggle="modal" 
                 data-target="#myModal">
                    Delete
                    </Button>
            </div>
            <div className="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        
        <br/><h4 className="modal-title" id="myModalLabel">Are You sure?</h4>
      </div>
      <div className="modal-body">
        After deleteing your account you will permenantly delete your account <br />
        and won't be able to recover it!
      </div>
      <div className="modal-footer">
        <button type="button" 
        className="btn btn-success" 
        data-dismiss="modal"
        onClick={()=>{ deleteUser()}}>I accept Delete!</button>
      </div>
    </div>
  </div>
</div>
            <div className="container">
            <Formik
            initialValues={{
              CNIC: "",
              oldpassword: "",
              password:"",
            }}
            validationSchema={SettingSchema}
            onSubmit={(values) => {
              handlesubmit(values);
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              errors,
              touched,
              isValid,
              isSubmitting,
            }) => (
                <Form className="mt-3  text-center " > 
                {/* onSubmit={handleSubmit} */}
                <h3>Reset Password</h3>
                <br/>
                {errors?.hasError && (
              <div className="alert alert-danger" role="alert">
                {errors?.data?.message}
              </div>
                )}
                <div class="form-group row form-row d-flex justify-content-center ">
                    <label  className="col col-1 d-flex justify-content-end">CNIC</label>
                    <div className="col col-3 ">
                            <input
                            className={`form-control ${
                                touched?.CNIC &&
                                errors?.CNIC&&
                                "is-invalid" 
                              }`}
                            aria-describedby="CNICHelpBlock"
                            placeholder='Enter your CNIC'
                            name="CNIC"
                            type="CNIC"
                            value={values?.CNIC}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required 
                                />
                                {touched?.CNIC && errors?.CNIC && (
                        <span className="invalid-feedback">
                          {errors?.CNIC}
                        </span>
                      )}
                        <small id="CNICHelpBlock" class="form-text text-muted">
                        CNIC must be in the form of 00000-0000000-0
                    </small>
                    </div>
                </div>
                <div class="form-group row form-row d-flex justify-content-center ">
                    <label  className="col col-1 d-flex justify-content-end ">Old Password</label>
                    <div className="col col-3 ">
                            <input
                            className={`form-control ${
                                touched?.oldpassword &&
                                errors?.oldpassword &&
                                "is-invalid" 
                            }`}
                            aria-describedby="passwordhelp"
                            placeholder='Enter your old Password'
                            name="oldpassword"
                            type="password"
                            value={values?.oldpassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required 
                            />
                            {touched?.CNIC && errors?.CNIC && (
                        <span className="invalid-feedback">
                          {errors?.oldpassword}
                        </span>
                      )}
                        <small id="passwordhelp" class="form-text text-muted">
                        Your password must be 8 characters long
                    </small>
                    </div>
                </div>
                <div class="form-group row form-row d-flex justify-content-center ">
                    <label  className="col col-1 d-flex justify-content-end ">New Password</label>
                    <div className="col col-3 ">
                            <input
                             className={`form-control ${
                                touched?.password &&
                                errors?.password&&
                                "is-invalid"
                                }`}

                            aria-describedby="passwordhelp"
                            placeholder='Enter your old Password'
                            name="password"
                            type="password"
                            value={values?.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required 
                                />
                                {touched?.CNIC && errors?.CNIC && (
                        <span className="invalid-feedback">
                          {errors?.password}
                        </span>
                      )}
                        <small id="CNICHelpBlock" class="form-text text-muted">
                        Your password must be 8 characters long
                    </small>
                    </div>
                </div>
                <br/>
                 <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={fill}
                      >
                        {fill ? (
                          <span>Loading...</span>
                        ) : (
                          <span>Submit</span>
                        )}
                      </button>
            </Form>
            )}
          </Formik>
            </div>
            
            
    </> 
    );
}
 
export default SettingB;