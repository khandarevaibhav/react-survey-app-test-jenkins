import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./Login/Login";
import Signup from "./SignUp/Signup";
import Home from "./CreatorComponents/Home/Home.js";
import Preview from "./CreatorComponents/Preview/Preview.js";
import AboutUs from "./CreatorComponents/AboutUs/AboutUs.js";
import Publish from "./CreatorComponents/Publish/Publish";
import UserEnd from "./UserComponents/UserEnd";
import Response from "./CreatorComponents/Response/Response";
import CreateForm from './CreatorComponents/CreateForm/CreateForm';

function App() {
  const [email, setEmail] = useState("");

  const getEmail = (par) => {
    setEmail(par)
  }

  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Login getEmail={getEmail} />} path="/" />
          <Route element={<Signup />} path="/signup" />
          <Route index element={<Home email={email} />} path="/:email/home" />
          <Route element={<CreateForm email={email} />} path="/:email/edit" />
          <Route element={<Preview/>} path="/:email/preview"/>
          <Route element={<AboutUs/>} path="/:email/about"/>
          <Route element={<Publish/>} path="/:email/publish"/>
          <Route element={<UserEnd/>} path="/userend/:id"/>
          <Route element={<Response/>} path="/:email/:id/responses"/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
