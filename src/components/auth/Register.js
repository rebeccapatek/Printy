import React, { useRef } from "react";
import "./Login.css";

const Register = props => {
  const email = useRef();
  const password = useRef();
  const verifyPassword = useRef();

//check to see if someone who is trying to register is already an existing user
  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?userEmail=${email.current.value}`)
      .then(_ => _.json())
      .then(user => {
        if (user.length) {
          return true;
        }
        return false;
      });
  };
  //prevents form from auto-submitting upon page load

  const handleRegister = e => {
    e.preventDefault();
//check to make sure the two passwords matching than create a new user in the database.

    if (password.current.value === verifyPassword.current.value) {
      existingUserCheck().then(() => {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userEmail: email.current.value,
            userPassword: password.current.value,
          })
        })
          .then(_ => _.json())
          .then(createdUser => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("printy_user", createdUser.id);
              props.history.push("/favorites/create");
            }
          });
      });
    } else {
      window.alert("Passwords do not match");
    }
  };
//form to register a new user
  return (
    <main style={{ textAlign: "center" }}>
      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Please Register for Printy
        </h1>
        
        <fieldset>
          <label htmlFor="inputEmail"> Email address </label>
          <input
            ref={email}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputPassword"> Password </label>
          <input
            ref={password}
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="verifyPassword"> Verify Password </label>
          <input
            ref={verifyPassword}
            type="password"
            name="verifyPassword"
            className="form-control"
            placeholder="Verify password"
            required
          />
        </fieldset>
        <fieldset>
          <button type="submit">Sign in</button>
        </fieldset>
      </form>
    </main>
  );
};

export default Register;