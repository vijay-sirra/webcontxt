import React, {useState} from 'react';
import axios from 'axios';
import { ACCESS_TOKEN_NAME} from '../constants/apiConstants';
import './registration.scss';
import { Form, Button } from 'react-bootstrap';
import { toast, Zoom } from 'react-toastify';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


export function Register (props) {

    /**
     * Registration form with validation using react hook form
     */
    const { register, handleSubmit, errors } = useForm();

    /**
     * Submit registration form 
     * @param e form field inputs
     */
    const onSubmit = (formdata) => {

        console.log(formdata);
        const payload = {
            "name": formdata.name,
            "email": formdata.email,
            "password": formdata.password,
            "address": formdata.address
        };
        axios.post('https://reqres.in/api/articles', {
            payload,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(function(response) {
            console.log(response);
            if(response.status === 201) {
                localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token); 
                toast.success('Registered Successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    transition: Zoom,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                props.history.push(`/`); 
            }
        }) 
        .then(response =>
            console.log("Success:", JSON.stringify(response)))
        .catch(function (error) {
            console.log(error);
        });
        
    }
    return (
        <>
        <h2 className="registration-heading">Register Yourself!</h2>
        <div className="registration">
            <Form className="registration-form" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                    <Form.Label className="label-text">NAME:</Form.Label>
                    <Form.Control autoFocus type="text" label="Name" id="name" name="name" ref={register({ required: true})}/>
                    {errors.name?.type === "required" && (<p className="login-errors">Name is required</p>)}
                </Form.Group>
                <Form.Group>
                    <Form.Label  className="label-text">EMAIL:</Form.Label>
                    <Form.Control  type="text" label="Email" id="email" name="email" 
                    ref={register({ required: true, pattern: /^([0-9a-z]([-.\w]*[0-9a-z])*@([0-9a-z][-\w]*[0-9a-z]\.)+[a-z]{2,3})$/i })}/>
                    {errors.email?.type === "required" && (<p className="login-errors">Email is required</p>)}
                    {errors.email?.type === "pattern" && (<p className="login-errors">Invalid Email Address</p>)}
                </Form.Group>
                <Form.Group>
                    <Form.Label  className="label-text">PASSWORD:</Form.Label>
                    <Form.Control  type="password" label="Password" id="password" name="password"
                    ref={register({ required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i})}/>
                    {errors.password?.type === "required" && (<p className="login-errors">Password is required</p>)}
                    {errors.password?.type === "pattern" && (<p className="login-errors">Password must be minimum eight characters long, use at least one letter and one number</p>)}
                </Form.Group>
                <Form.Group>
                    <Form.Label  className="label-text">ADDRESS:</Form.Label>
                    <Form.Control  type="text" label="Address" id="address" name="address"
                    ref={register({ required: true})}/>
                    {errors.address?.type === "required" && (<p className="login-errors">Address is required</p>)}
                </Form.Group>
                <Button className="sign-up" type="submit" variant="primary" color="primary">  
                    Sign Up
                </Button>
                <Link className="signup-cancel" to="/">Cancel</Link>
            </Form>
        </div>
        </>
         
    );
}
export default Register;