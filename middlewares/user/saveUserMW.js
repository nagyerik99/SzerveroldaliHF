const requireOption = require("../common");

/**
 * Registers the user with the given informations email, name, doornum password.
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  const userModel = requireOption(objectrepository, "userModel");

  return function (req, res, next) {
    if (req.method !== "POST" || res.locals.error.length !== 0) {
      res.locals.data = req.body;
      return next();
    }

    res.locals.user = new userModel();
    res.locals.user.name = req.body.name;
    res.locals.user.email = req.body.email;
    res.locals.user.door_number = req.body.door_number;
    res.locals.user.password = req.body.password;

    res.locals.user.save((err) => {
      if (err) {
        return next(err);
      }

      res.locals.error.push("The registration was successful!");
      res.locals.data = {}; //ne szalljon el az ejs.
      return next();
    });
  };
};
