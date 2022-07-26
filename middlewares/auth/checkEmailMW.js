const requireOption = require("../common");

/**
 * checking the given eamil on forgot password and if not in database, then sends warning.
 * @param objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  const userModel = requireOption(objectrepository, "userModel");

  return function (req, res, next) {
    if (typeof req.body === 'undefined' || typeof req.body.email === "undefined") {
      return next();
    }

    userModel.findOne(
      {
        email: req.body.email,
      },
      function (err, user) {
        if (err || !user) {
          res.locals.error.push("We have no such email in our database!");
          return next();
        }

        res.locals.userpass = user.password; //mi baj lehetne :D

        return next();
      }
    );
  };
};
