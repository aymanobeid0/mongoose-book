var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
  projectName: String,
  createdOn: { type: Date, default: Date.now },
  modifiedOn: Date,
  createdBy: String,
  contributors: String,
  tasks: String,
});

mongoose.model("Project", projectSchema);
