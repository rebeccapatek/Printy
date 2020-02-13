import React from "react"
import { Route, Redirect } from "react-router-dom"
import NavBar from "./nav/NavBar"
import "./Printy.css"
import Login from "./auth/Login"
import Register from "./auth/Register"
import ApplicationViews from "./ApplicationViews"

 // If you have a printy user stored then take to navbar and application views otherwise redirect to login
export default () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("printy_user")) {
                return (
                    <>
                        <Route render={props => <NavBar {...props} />} />
                        <Route render={props => <ApplicationViews {...props} />} />
                        
                    </>
                )
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
    </>
)