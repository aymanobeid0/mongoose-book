const User = require("../model/user");

exports.create = function (req, res) {
  res.render("user-form", { title: "Create user", buttonText: "Join!" });
};
exports.doCreate = function (req, res) {
  User.create(
    {
      name: req.body.FullName,
      email: req.body.Email,
      modifiedOn: Date.now(),
      lastLogin: Date.now(),
    },
    function (err, user) {
      if (err) {
        if (err.code === 11000) {
          res.redirect("/user/new?exists=true");
        } else {
          res.redirect("/user/new?error=true");
        }
      } else {
        // Success
        console.log("User created and saved: " + user);
        req.session.user = {
          name: user.name,
          email: user.email,
          _id: user._id,
        };
        req.session.loggedIn = true;
        res.redirect("/user");
      }

      // console.log(user.id);
    }
  );
  // res.status(200).json("sent sucess");
  res.redirect("/user/new");
};
