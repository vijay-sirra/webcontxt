import React, { useState } from "react";
import { Button } from "@material-ui/core";
import annualMeet from '../images/annual-meet.png';
import './login-page.scss';
import axios from 'axios';
import emailIcon from '../images/email-icon.png';
import vactorImage from '../images/vactor-corner.png';
import { Link } from "react-router-dom";
import { ACCESS_TOKEN_NAME} from '../constants/apiConstants';
import { toast, Zoom } from 'react-toastify';
import { useForm } from "react-hook-form";


export function LoginFormSubmit(props) {

  /**
   * Login form with validation using react hook form
   */
  const { register, handleSubmit, errors } = useForm();

  /**
   * Submit method for registration form
   * @param {*} data Form fields data
   */
  const onSubmit = data => {

    const payload = {
      "email": data.email
    };

    axios.post("https://pointy-gauge.glitch.me/api/form", {
      payload,
      headers: {
        'Content-Type': 'application/json',
    }
    })
      .then(function(response) {
        if(response.status === 200) {
          localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token); 
          toast.success('Log In Successfully', {
            position: "top-right",
            autoClose: 2000,
            transition: Zoom,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          props.history.push(`/content`); 
        }
        else if(response.code === 204){
            props.showError("Email do not match");
        }
        else{
            props.showError("Email does not exists");
        }
    })
    .then(response => response.json())
      .then(response =>
       console.log("Success:", JSON.stringify(response)))
    .catch(function (error) {
        console.log(error);
    });
  };

  return (
    <>
      <div className="Login">
        <div className="container-fluid">
          <div className="row login-layout">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
              <div className="login-details">
                <img src={annualMeet} alt="Annual Meet"/>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 form-container">
              <div className="login-form">
                <form className="login-form-fields" onSubmit={handleSubmit(onSubmit)}>
                  <p className="loginText">Login</p>
                  <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                      <div className="email-form">
                        <span className="email-icon">
                          <img src={emailIcon} className="inv-icon" alt="Email Icon"/>
                        </span>
                        <input placeholder="MARS EMAIL ID" id="usermail" name="email" variant="outlined" className="textField"
                        ref={register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}/>
                      </div>
                      {errors.email?.type === "required" && (<p className="login-errors">Email is required</p>)}
                      {errors.email?.type === "pattern" && (<p className="login-errors">Invalid Email Address</p>)}
                    </div>
                  </div>
                  <div className="row login-button">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                      <Button type="submit" variant="contained" color="primary" className="submit">  
                        SUBMIT
                      </Button>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                      <Link className="registration-link" to="/registration">
                        <Button type="button" variant="contained" color="primary" className="submit">  
                          REGISTRATION
                        </Button>
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="bottom-vactor-img">
              <img className="vactor-img" src={vactorImage} alt="Vactor circule"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default LoginFormSubmit;