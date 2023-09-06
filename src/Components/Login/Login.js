import React, { useState } from "react";
import "./Login.css";
import handleLogin from "../Auth/HandleLogin";
import { useNavigate } from "react-router-dom";


const Login = (props) => {
  const navigate = useNavigate();

  const [dailog, setDialog] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".")

    //validation
    if (email === '' || password === '' || email === null || password === null) {
      setDialog("All details are mandatory !")
    }

    else if (atposition < 1 || dotposition < atposition + 2 || dotposition + 2 >= email.length) {
      setDialog("Please enter a valid e-mail address");
    }

    else {
      const userInput = {
        email: email,
        password: password,
      };

      const accessFlag = await handleLogin(userInput,setDialog);

      if (accessFlag === true) {
        //navigate to User Home Page
        setDialog("Logged in !")

        props.getEmail(email)
        navigate(`/${email}/home`, { state: { email: email } })
      }
    }
  };

  return (
    <div className="login-root">
      <div className="formBuilder">
        <h1>Welcome to Form Generator!</h1>
      </div>

      <div className="loginContainer">
        <h1>Log In</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="item">
            <label className="label" htmlFor="email">

            </label>
            <input
              className="item1"
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              autoComplete="off"
            ></input>
          </div>

          <div className="item">
            <label className="label" htmlFor="password">

            </label>
            <input
              className="item1 item2"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              autoComplete="off"
            ></input>
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
          <div className="item">
            <span>
              <button className="navigation" onClick={() => { navigate('/forgotPassword') }}>Forgot Password?</button>
            </span>
          </div>
        </form>
        <div className="item">
          <span>
            Don't have an account? <button className="navigation" onClick={() => { navigate('/signup') }}> Sign up</button>
          </span>
        </div>
        <div style={{ marginTop: "30px" }}>
          <h4 style={{ color: "black" }}>{dailog}</h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
