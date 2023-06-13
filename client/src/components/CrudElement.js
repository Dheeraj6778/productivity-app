import React, { useState } from "react";
import "./crudElement.css";
function CrudElement({ task, handleDelete, handleCompleted }) {
  const [color,setColor] = useState("");
  const greenBackground = {
    backgroundColor: color,
  };
  return (
    <div className="elem">
      <input style={greenBackground} placeholder={task} value={task} className="rounded" />
      <button onClick={()=>handleDelete(task)} className="btn btn-danger btn-sm">
        Delete
      </button>
      <button onClick={()=>handleCompleted(color,setColor)} className="btn btn-success btn-sm">
        Completed
      </button>
    </div>
  );
}

export default CrudElement;
