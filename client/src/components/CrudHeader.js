import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Select from "react-select";
function CrudHeader({
  label,
  date,
  setTask,
  setLabel,
  setDate,
  handleAddTask,
  options,
  setSearchQuery,
  handleSearch,
  setFilterQuery,
  filterQuery,
  handleFilter,
}) {
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
        <div>
          <button className="btn">
            <Select
              value={filterQuery.value}
              onChange={(event) => {
                setFilterQuery(event.value);
              }}
              options={options}
              placeholder="Select a label to filter tasks"
            />
          </button>
          <button onClick={handleFilter} className="btn btn-secondary">Filter</button>
        </div>
      </div>
      <nav class="navbar">
        <div class="container-fluid">
          <input
            onChange={(event) => setSearchQuery(event.target.value)}
            style={{ "margin-left": "235px" }}
            className="rounded"
            type="text"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            onClick={handleSearch}
            class="btn btn-outline-success"
            style={{
              "margin-right": "250px",
              "padding-left": "48px",
              "padding-right": "48px",
            }}
          >
            Search
          </button>
        </div>
      </nav>
    </div>
  );
}

export default CrudHeader;
