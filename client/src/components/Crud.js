import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Crud.css";
import axios from "axios";
import CrudHeader from "./CrudHeader";
function Crud({ username }) {
  const [task, setTask] = useState("");
  const [label, setLabel] = useState("");
  const [date, setDate] = useState("");
  const options = [
    { value: "office", label: "office" },
    { value: "health", label: "health" },
    { value: "social", label: "social" },
  ];
  let handleAddTask = async () => {
    //
    console.log("inside handle task");
    let obj = { username, type: label.value, deadline: date, task };
    try {
      let resp = await axios.post("http://localhost:3001/addTask", obj);
      console.log(resp);
    } catch (err) {
      console.log("error in pushing the data to the database");
    }
  };
  useEffect(()=>{
    
  })
  return (
    <div>
      <CrudHeader
        label={label}
        date={date}
        setTask={setTask}
        setLabel={setLabel}
        setDate={setDate}
        handleAddTask={handleAddTask}
        options={options}
      />
    </div>
  );
}

export default Crud;
