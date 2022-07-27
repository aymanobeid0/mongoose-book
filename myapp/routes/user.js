const { render } = require("jade");
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
          return res.redirect("/user/new?exists=true");
        } else {
          return res.redirect("/user/new?error=true");
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
        console.log(req.session);
        res.redirect("/user");
      }
    }
  );
};

exports.index = function (req, res) {
  if (!req.session.loggedin) {
    return res.redirect("/login");
  } else {
    return res.render("user-page", {
      title: req.session.user.name,
      name: req.session.user.name,
      email: req.session.user.email,
      userID: req.session.user.id,
    });
  }
};

exports.login = function (req, res) {
  res.render("login-form", {
    title: "Login",
  });
};
exports.doLogin = function (req, res) {
  if (req.body.Email) {
    User.findOne(
      {
        email: req.body.Email,
      },
      "_id name email ",
      function (err, user) {
        if (!err) {
          if (!user) {
            return res.redirect("/login?404=user");
          } else {
            req.session.user = {
              name: user.name,
              email: user.email,
              id: user._id,
            };
            req.session.loggedin = true;
            console.log("Logged in user: " + user);
            console.log(req.session.user.id);
            return res.redirect("/user");
          }
        } else {
          return res.redirect("/login?404=error");
        }
      }
    );
  } else {
    return res.redirect("/login?404=error");
  }
};
