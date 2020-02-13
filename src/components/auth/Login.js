import React, { useRef } from "react"
import { Link } from "react-router-dom";
import "./Login.css"


const Login = props => {
    const email = useRef()
    const password = useRef()
//the useRef is a hook that sets the initial value of theses keys to null, then changes it to the correct value?
    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?userEmail=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return user[0]
                }
                return false
            })
    }
//keeps the page from auto submitting the form without clicking submit
    const handleLogin = (e) => {
        e.preventDefault()
//if user and password are correct, send to create a tshirt and store printy user in localStorage. if not display corresponding message
        existingUserCheck()
            .then(exists => {
                if (exists && exists.userPassword === password.current.value) {
                    localStorage.setItem("printy_user", exists.id)
                    props.history.push("/favorites/create")
                } else if (exists && exists.userPassword !== password.current.value) {
                    window.alert("Password does not match")
                  } else if (!exists) {
                    window.alert("user does not exist")

                }
            })
    }
//This returns the form for login
    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1 className="login_header">Login to Create a Custom T-shirt</h1>
                    
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input ref={email} type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password"
                            id="password"
                            className="form-control"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                    </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
export default Login