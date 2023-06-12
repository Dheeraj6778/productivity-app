import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
function Form({setEmail,setPassword,handleSubmit}) {
  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h2 className="header">Login Page</h2>
        <div className="mb-3">
          <label for="email" className="form-label">
            Email address
          </label>
          <input
            onChange={(event) => setEmail(event.target.value)}
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

export default Form