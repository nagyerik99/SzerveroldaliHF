const requireOption = require("../common");

/**
 * Gets a given user, if capable
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  const userModel = requireOption(objectrepository, "userModel");

  return function (req, res, next) {
    userModel.findOne(
      {
        _id: req.session.userid,
      },
      (err, user) => {
        if (err || !user) {
          return next(err);
        }

        res.locals.user = user;

        return next();
      }
    );
  };
};
