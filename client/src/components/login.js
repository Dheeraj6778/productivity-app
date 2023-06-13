import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import Dashboard from "./Dashboard";
import Form from "./Form";
import jwtDecode from "jwt-decode";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username,setUsername]=useState("initial");
  const navigate = useNavigate();
  let handleSubmit = async (event) => {
    event.preventDefault();
    let obj = { email, password };
    try {
      let resp = await axios.post("http://localhost:3001/login", obj);
      console.log("response is ",resp);
      //console.log(resp.data.username);
      if (resp.status === 200) {
        console.log("token is ", resp.data.token);
        setLoggedIn(true);
        localStorage.setItem("token", resp.data.token);
        localStorage.setItem("username", resp.data._doc.username);
        console.log(resp.data._doc.username);
        // setUsername(resp.data.username);
        setUsername(resp.data._doc.username);
      }
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(()=>{
    //just renders again ig
    const token=localStorage.getItem("token");
    if(token){
      const decodedToken=jwtDecode(token);
      //now check the expiry of the token
      if(decodedToken.exp*1000>Date.now()){
        setLoggedIn(true);
      }else{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setLoggedIn(false);
      }
    }
  },[loggedIn])
  return (
    <div>
      {loggedIn === true ? (
        <Dashboard
          username={localStorage.getItem("username")}
          setLoggedIn={setLoggedIn}
        />
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
