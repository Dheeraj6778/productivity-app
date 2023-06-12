import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {  useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
function Signup() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  let handleSubmit = async (event) => {
    event.preventDefault();
    console.log("clicked on submit");
    let obj = { username, firstName, email, password };
    console.log(obj);
    try {
      let resp = await axios.post("http://localhost:3001/signup", obj);
      console.log("response is ");
      console.log(resp);
      let status = resp.status;
      console.log("status is ", status);
      setStatus(status);
    } catch (err) {
      console.log("some error in sign up");
      console.log(err.response);
      if (err.response && err.response.status) setStatus(err.response.status);
      setMessage(err.message);
      navigate("/login");
    }
  };
  useEffect(() => {}, [status]);
  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        {status === 409 ? message : ""}
        {status === 201 ? "new user added" : ""}
        <h2 className="header">Signup Page</h2>
        <div className="mb-3">
          <label for="username" className="form-label">
            Username
          </label>
          <input
            onChange={(event) => setUsername(event.target.value)}
            name="username"
            type="text"
            className="form-control"
            id="username"
          />
        </div>
        <div className="mb-3">
          <label for="first_name" className="form-label">
            First Name
          </label>
          <input
            onChange={(event) => setFirstName(event.target.value)}
            type="text"
            name="first_name"
            className="form-control"
            id="first_name"
          />
        </div>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email address
          </label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="password" className="form-label">
            Password
          </label>
          <input
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
