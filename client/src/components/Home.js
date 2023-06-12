import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./home.css";
function Home() {
  return (
    <div className="home">
      <div className="home__header">
        <h2>Wanna increase your productivity???</h2>
        <h3>What are you waiting for !!!</h3>
      </div>
      <div className="home__body">
        <button className="btn btn-warning">
          <a href="/login">Login</a>
        </button>
        <button className="btn btn-warning">
          <a href="/signup">Sign Up</a>
        </button>
      </div>
    </div>
  );
}

export default Home;
