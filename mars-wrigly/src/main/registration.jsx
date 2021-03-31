import React, {useState} from 'react';
import axios from 'axios';
import { ACCESS_TOKEN_NAME} from '../constants/apiConstants';
import './registration.scss';
import { Form, Button } from 'react-bootstrap';
import { toast, Zoom } from 'react-toastify';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


export function Register (props) {

    const { register, handleSubmit, watch, errors } = useForm();

    const [input , setInput] = useState({
        name : "",
        email : "",
        password: "",
        address: "",
    })
    console.log(input);
    console.log(props);
    const handleChange = (e) => {
        const {id , value} = e.target
        console.log(id);   
        console.log(value);
        setInput(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const onSubmit = (e) => {
        // onError.preventDefault();
        console.log(e);
        const payload = {
            "name": input.name,
            "email": input.email,
            "password": input.password,
            "address": input.address
        };
            console.log(payload);

            axios.post("https://pointy-gauge.glitch.me/api/form ", payload)
        .then(function(response) {
                if(response.status === 200) {
                    localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token); 
                    toast.success('Registered Successfully', {
                    position: "top-right",
                    autoClose: 3000,
                    transition: Zoom,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                    console.log("it should redirect");
                    props.history.push(`/`); 
                }
        }) .then(response => response.json())
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
                    <Form.Control type="text" label="Name" id="name" name="name" value={input.id} onChange={handleChange}
                     ref={register({ required: true})}/>
                     {errors.name?.type === "required" && (<p className="login-errors">Name is required</p>)}
                </Form.Group>
                <Form.Group>
                    <Form.Label  className="label-text">EMAIL:</Form.Label>
                    <Form.Control  type="email" label="Email" id="email" name="email" value={input.id} onChange={handleChange} 
                    ref={register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}/>
                    {errors.email?.type === "required" && (<p className="login-errors">Email is required</p>)}
                    {errors.email?.type === "pattern" && (<p className="login-errors">Invalid Email Address</p>)}
                </Form.Group>
                <Form.Group>
                    <Form.Label  className="label-text">PASSWORD:</Form.Label>
                    <Form.Control  type="password" label="Password" id="password" name="password" value={input.id} onChange={handleChange}
                    ref={register({ required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i})}/>
                    {errors.password?.type === "required" && (<p className="login-errors">Password is required</p>)}
                    {errors.password?.type === "pattern" && (<p className="login-errors">Password must be minimum eight characters long, use at least one letter and one number</p>)}
                </Form.Group>
                <Form.Group>
                    <Form.Label  className="label-text">ADDRESS:</Form.Label>
                    <Form.Control  type="text" label="Address" id="address" name="address" value={input.id} onChange={handleChange} ref={register({ required: true})}/>
                     {errors.address?.type === "required" && (<p className="login-errors">Address is required</p>)}
                </Form.Group>
                <Button className="sign-up" type="submit" variant="primary" color="primary">  
                    Sign Up
                </Button>
                <Link className="signup-cancel" type="button btn" to="/">Cancel</Link>
            </Form>
            </div>
        </>
         
    );
}
export default Register;