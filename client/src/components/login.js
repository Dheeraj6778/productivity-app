import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import Dashboard from "./Dashboard";
import Form from "./Form";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username,setUsername]=useState("");
  const navigate = useNavigate();
  let handleSubmit = async (event) => {
    event.preventDefault();
    let obj = { email, password };
    try {
      let resp = await axios.post("http://localhost:3001/login", obj);
      console.log("response is ");
      console.log(resp.data.username);
      if (resp.status === 200) {
        setLoggedIn(true);
        setUsername(resp.data.username);
      }
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    //just renders again ig
  },[loggedIn])
  return (
    <div>
      {loggedIn === true ? (
        <Dashboard username={username} setLoggedIn={setLoggedIn} />
      ) : (
        <Form
          setEmail={setEmail}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default Login;
