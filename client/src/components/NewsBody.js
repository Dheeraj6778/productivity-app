import React from "react";

function NewsBody({ title, description, url, imageUrl }) {
  return (
    <div>
      <div className="card" style={{ width: "22rem" }}>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={url} class="card-link">
            News Source
          </a>
          <br />
          <img src={imageUrl} height="200px" width="250px" />
        </div>
      </div>
    </div>
  );
}

export default NewsBody;
