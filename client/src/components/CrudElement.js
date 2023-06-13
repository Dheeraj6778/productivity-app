import React from "react";
import "./crudElement.css";
function CrudElement({ task, handleDelete, handleCompleted }) {
  return (
    <div className="elem">
      <input placeholder={task} value={task} className="rounded" />
      <button onClick={handleDelete} className="btn btn-danger btn-sm">
        Delete
      </button>
      <button onClick={handleCompleted} className="btn btn-success btn-sm">
        Completed
      </button>
    </div>
  );
}

export default CrudElement;
