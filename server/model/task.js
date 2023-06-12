const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  username: { type: String, required: true },
  type: { type: String },
  deadline: { type: Date },
  task: { type: String },
});

//creating a model using th schema
const Task = mongoose.model("task", taskSchema);
module.exports = {
  Task,
};
