const requireOption = require("../common");

/**
 * Gets all the rental requests that the current user has.
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  const rentedModel = requireOption(objectrepository, "rentedModel");
  const userModel = requireOption(objectrepository, 'userModel');
  const itemModel = requireOption(objectrepository, 'itemModel');
  return function (req, res, next) {
    if (typeof res.locals.user === "undefined") {
      return next("No user error");
    }

    rentedModel.find({
      _owner: res.locals.user._id,
      rented_already: false,
    })
    .populate({path: '_renter', select: 'name door_number'})
    .populate({path: '_item', select: 'name'})
    .exec(function (err, requests) {
      if(err || !requests){
        return next(err);
      }

      res.locals.requests = requests;

      return next();
    });
  };
};
