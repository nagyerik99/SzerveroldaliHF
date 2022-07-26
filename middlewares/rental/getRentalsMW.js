const requireOption = require("../common");

/**
 * Returns all the rentable item, currently available for the given user.
 * (All the currently not rented item, which is not the user's)
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  const itemModel = requireOption(objectrepository, "itemModel");

  return function (req, res, next) {
    if (typeof res.locals.user === "undefined") {
      return next("No user error");
    }

    itemModel.find(
      {
        _owner: { $ne: res.locals.user._id },
      },
      (err, rentals) => {
        if (err || !rentals) {
          return next(err);
        }

        res.locals.rentals = rentals;
        return next();
      }
    );
  };
};
