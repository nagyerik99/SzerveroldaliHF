const requireOption = require("../common");

/**
 * checking the given eamil on registration, and if it is already registered, sends warning.
 * @param objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  const userModel = requireOption(objectrepository, "userModel");

  return function (req, res, next) {
    if (req.method !== "POST" || res.locals.error.length !== 0) {
      return next();
    }

    userModel.findOne(
      {
        email: req.body.email,
      },
      function (err, user) {
        if (err || user) {
          res.locals.error.push("This email, has been already registered!");
        }

        return next();
      }
    );
  };
};
