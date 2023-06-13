import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
function Navbar({ username, setLoggedIn }) {
  //add a functionality to fetch a positive quote and put it on navbar
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let resp = await axios.get("https://catfact.ninja/fact");
        console.log(resp.data.fact);
        setQuote(resp.data.fact);
      } catch (err) {
        console.log("error in fetching data");
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <div>
        <nav class="navbar sticky-top bg-body-tertiary">
          <div class="container-fluid">
            <h2 class="navbar-brand text-body-secondary">Hello {username}</h2>
            <span>
              <b>positive thought of the day:</b> {quote}
            </span>
            <button
              onClick={() => {localStorage.removeItem("token");localStorage.removeItem("username");setLoggedIn(false);}}
              class="btn btn-outline-success float-right"
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
