var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
  projectName: String,
  createdOn: { type: Date, default: Date.now },
  modifiedOn: Date,
  createdBy: String,
  contributors: String,
  tasks: String,
});

// define ststics on the schema
projectSchema.statics.findByUserID = function (userid, callback) {
  this.find(
    { createdBy: userid },
    "id projectName ",
    { sort: { createdOn: -1 } },
    callback
  );
};

module.exports = mongoose.model("Project", projectSchema);
