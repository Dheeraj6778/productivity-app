import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./Navbar";
import Crud from "./Crud";
function Dashboard({ username, setLoggedIn }) {
  return (
    <div>
      <Navbar username={username} setLoggedIn={setLoggedIn} />;
      <div class="container ">
        <div class="row">
          <div class="col-2 text-center">c</div>
          <div class="col-8 text-center">
            {/* crud component */}
            <h2>Add Task</h2>
            <Crud username={username} />
          </div>
          <div class="col-2 text-center">c</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
