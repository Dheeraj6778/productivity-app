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
  const [originalData, setOriginalData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  let handleDelete = async (val) => {
    //do something
    try {
      let resp = await axios.post("http://localhost:3001/deleteTask", {
        task: val,
      });
      console.log(resp.data);
    } catch (err) {
      console.log("error in sending a request");
    }
    setClicked((prev) => prev + 1);
  };
  let handleCompleted = (color, setColor) => {
    //do something
    if (color === "") {
      setColor("#34eb52");
    } else if (color === "#34eb52") setColor("");
    setClicked((prev) => prev + 1);
  };
  let handleSearch = () => {
    //do something
    let temp = originalData.filter((elem) => elem.task.startsWith(searchQuery));
    setData(temp);
    //setClicked(prev=>prev+1);
  };
  let handleFilter = () => {
    //do something
    console.log("inside handle filter");
    console.log("query is ", filterQuery);
    console.log("original data ", originalData);
    let temp = originalData.filter((elem) => elem.type === filterQuery);
    setData(temp);
  };
  let handleAscTask = () => {
    console.log("inside handle asc task");
    let temp = data.sort((a, b) => a.task.localeCompare(b.task));
    setData(temp);
  };
  let handleDscTask = () => {
    //do something
    let temp = data.sort((a, b) => b.task.localeCompare(a.task));
    console.log("inside dsc task");
    setData(temp);
  };
  let handleAscDeadline = () => {
    console.log("inside asc deadline");
    let temp = data.sort((a, b) => a.deadline.localeCompare(b.deadline));
    setData(temp);
  };
  let handleDscDeadline = () => {
    console.log("inside dsc deadline");
    let temp = data.sort((a, b) => b.deadline.localeCompare(a.deadline));
    setData(temp);
  };

  const options = [
    { value: "office", label: "office" },
    { value: "health", label: "health" },
    { value: "social", label: "social" },
    { value: "home chores", label: "home chores" },
  ];
  let handleAddTask = async () => {
    //
    console.log("inside handle task");
    let obj = { username, type: label, deadline: date, task };
    console.log("added obj is ", obj);
    try {
      let resp = await axios.post("http://localhost:3001/addTask", obj);
      console.log(resp);
      setClicked((prev) => prev + 1);
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
      setOriginalData(resp.data);
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
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        handleFilter={handleFilter}
        filterQuery={filterQuery}
        setFilterQuery={setFilterQuery}
        handleAscTask={handleAscTask}
        handleDscTask={handleDscTask}
        handleAscDeadline={handleAscDeadline}
        handleDscDeadline={handleDscDeadline}
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
