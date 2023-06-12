const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, default: null, required: true },
  email: { type: String, default: null, required: true },
  password: { type: String, default: null, required: true },
  token: { type: String },
});
let user = mongoose.model("user", userSchema);
module.exports = {
  user,
};
