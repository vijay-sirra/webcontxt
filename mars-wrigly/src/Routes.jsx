import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {LoginFormSubmit} from './login/login-page';
import Content from './main/content';
import Register from './registration/registration';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Routes () {
    
    // render() {
        return (
            <>
            <Router>
                <Switch>
                    <Route path="/" exact component={LoginFormSubmit} />
                    <Route path="/content" component={Content} />
                    <Route path="/registration" component={Register} />
                </Switch>
            </Router>
            <ToastContainer />
            </>
        )
}

export default Routes;
