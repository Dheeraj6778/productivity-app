import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
function CrudHeader({ label,date,setTask, setLabel, setDate, handleAddTask,options }) {
  return (
    <div>
      <div>
        <input
          onChange={(event) => setTask(event.target.value)}
          className="rounded"
          type="text"
          placeholder="Enter task..."
        />
        <button className="btn">
          <input
            onChange={(event) => setDate(event.target.value)}
            className="rounded"
            type="date"
            value={date}
            id="date"
          />
        </button>
        <button className="btn">
          <Select
            value={label.value}
            onChange={(event) => setLabel(event.value)}
            options={options}
            placeholder="Select an option"
          />
        </button>
        <button onClick={handleAddTask} className="btn btn-secondary">
          Add Task
        </button>
      </div>
    </div>
  );
}

export default CrudHeader