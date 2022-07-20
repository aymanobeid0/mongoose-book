var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  createdOn: Date,
  lastName: { type: String },
  modifiedOn: { type: Date, default: () => Date.now() },
  lastLogin: Date,
});

module.exports = mongoose.model("User", userSchema);
