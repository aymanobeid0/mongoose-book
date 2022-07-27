const Project = require("../model/project");

exports.create = function (req, res) {};

exports.doCreate = function (req, res) {};

exports.byUser = function (req, res) {
  console.log("Getting user projects");
  if (req.params.userid) {
    Project.findByUserID(req.params.userid, function (err, projects) {
      if (!err) {
        console.log(projects);
        res.json(projects);
      } else {
        console.log(err);
        res.json({ status: "error", error: "Error finding projects" });
      }
    });
  } else {
    console.log("No user id supplied");
    res.json({ status: "error", error: "No user id supplied" });
  }
};
