const user = require("./model/user");

user.find({ name: "ayman" }, function (err, users) {
  if (!err) {
    console.log(users);
  }
});
