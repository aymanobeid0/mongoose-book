const Project = require("../model/project");
const User = require("../model/user");

exports.create = function (req, res) {};

exports.doCreate = function (req, res) {};

exports.byUser = function (req, res) {
  console.log("Getting user projects");
  if (req.params.userid) {
    Project.findByUserID(req.params.userid, function (err, projects) {
      if (!err) {
        // console.log(projects);
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

exports.displayInfo = function (req, res) {
  // console.log("Finding project _id: " + req.params.id);

  if (req.session.loggedin !== true) {
    return res.redirect("/login");
  } else {
    if (req.params.id) {
      Project.findById(req.params.id, function (err, project) {
        if (err) {
          console.log(err);
          return res.redirect("/user?404=project");
        } else {
          return res.render("project-page", {
            title: project.projectName,
            projectName: project.projectName,
            createdBy: req.session.user.name,
            creatorID: req.session.user.id,
            projectID: req.params.id,
          });
        }
      });
    } else {
      return res.redirect("/user");
    }
  }
};
