const requireOption = require("../common");

/**
 * checking the req.body values if filled out.
 * Sends error if required field is not filled.
 * @param objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  const userModel = requireOption(objectrepository, "userModel");

  return function (req, res, next) {
    if (req.method === "POST") {
      if (req.body.name === "") {
        res.locals.error.push("Name is required!");
      }
      if (req.body.email === "") {
        res.locals.error.push("Email is required!");
      }
      if (req.body.door_number === "") {
        res.locals.error.push("Door number is required!");
      }
      if (req.body.password === "") {
        res.locals.error.push("Password is required!");
      }
      if (
        req.body.repeat_password === "" ||
        req.body.password !== req.body.repeat_password
      ) {
        res.locals.error.push("Passwords does not match!");
      }
    }

    return next();
  };
};
