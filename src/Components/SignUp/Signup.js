import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import handleSingup from "../Auth/HandleSignup.js";

const Signup = () => {
  const navigate = useNavigate();

  const [dailog,setDialog]=useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".")

    if (email === "" || password === "" || confirmPassword === "" || email === null || password === null || confirmPassword === null) {
      setDialog("All details are mandatory !");
    }

    else if (password !== confirmPassword) {
      setDialog("Password does not match !")
    }

    else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length) {
      setDialog("Please enter a valid e-mail address");
    }


    else {
      const userInput = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      const accessFlag = await handleSingup(userInput,setDialog);

      if (accessFlag === true) {
        event.target.email.value = ""
        event.target.password.value = ""
        event.target.confirmPassword.value = ""
        setDialog("User Registered Succesfully");
      }
    }
  };

  return (
    <div className="signup-root">
      <div className="formBuilder formSupport">
        <h1>Get started with your Form Generator journey!</h1>
      </div>

      <div className="signupContainer loginContainer">
        <h1>Sign Up</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="item">
            <label className="label" htmlFor="email"></label>
            <input
              className="item1 input"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
            ></input>
          </div>

          <div className="item">
            <label className="label" htmlFor="password"></label>
            <input
              className="item1 input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
            ></input>
          </div>

          <div className="item">
            <label className="label" htmlFor="confirmPassword"></label>
            <input
              className="item1 input"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="off"
            ></input>
          </div>

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
        <div className="item">
          <span>
            Already have an account?{" "}
            <button
              className="navigation"
              onClick={() => {
                navigate("/");
              }}
            >
              {" "}
              Log in
            </button>
          </span>
        </div>
        <div style={{marginTop:"30px"}}>
        <h4 style={{color:"black"}}>{dailog}</h4>
      </div>
      </div>
      
    </div>
  );
};

export default Signup;
