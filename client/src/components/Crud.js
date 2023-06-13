import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Crud.css";
import axios from "axios";
import CrudHeader from "./CrudHeader";
import CrudElement from "./CrudElement";
function Crud({ username }) {
  const [task, setTask] = useState("");
  const [label, setLabel] = useState("");
  const [date, setDate] = useState("");
  const [clicked, setClicked] = useState(0);
  const [data, setData] = useState([]);
  let handleDelete =async (val) => {
    //do something
    try{
      let resp = await axios.post("http://localhost:3001/deleteTask",{task:val});
      console.log(resp.data);
    }catch(err){
      console.log("error in sending a request");
    }
    setClicked((prev) => prev + 1);
  };
  let handleCompleted = (color,setColor) => {
    //do something
    if(color===""){
      setColor("#34eb52");
    }
    else if (color === "#34eb52") setColor("");
    setClicked((prev) => prev + 1);
  };
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
      setClicked(prev=>prev+1);
    } catch (err) {
      console.log("error in pushing the data to the database");
    }
  };
  let fetchData = async () => {
    try {
      //do something
      let resp = await axios.post("http://localhost:3001/getTasks", {
        username: username,
      });
      console.log(resp.data);
      setData(resp.data);
    } catch (err) {
      console.log("error in fetching fata from the db");
    }
  };
  useEffect(() => {
    fetchData();
  }, [clicked]);
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
      {data.map((elem) => (
        <CrudElement
          task={elem.task}
          handleDelete={handleDelete}
          handleCompleted={handleCompleted}
        />
      ))}
    </div>
  );
}

export default Crud;
