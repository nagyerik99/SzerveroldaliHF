const requireOption = require("../common");

/**
 * It gets the rentable item, which has the given rental_id.
 * Actually it just returns an other user's rentable item from the inventory.
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  const itemModel = requireOption(objectrepository, "itemModel");
  const userModel = requireOption(objectrepository, "userModel");

  return function (req, res, next) {
    if (
      typeof res.locals.user === "undefined" ||
      typeof req.params.rentalid === "undefined"
    ) {
      return next("No user/rentalid error");
    }

    itemModel.findOne(
      {
        _id: req.params.rentalid,
      },
      (err, rentalItem) => {
        if (err || !rentalItem) {
          return next(err);
        }

        res.locals.rental = rentalItem;

        userModel.findOne(
          {
            _id: res.locals.rental._owner,
          },
          (err, owner) => {
            if (err || !owner) {
              return next(err);
            }

            res.locals.owner = owner;

            return next();
          }
        );
      }
    );
  };
};
