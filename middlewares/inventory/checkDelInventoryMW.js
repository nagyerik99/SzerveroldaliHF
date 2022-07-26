const requireOption = require("../common");

/**
 * It checks wether the inventory item, can be deleted.
 * It can not be deleted if, the item is already rented.
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  const rentedModel = requireOption(objectrepository, "rentedModel");
  return function (req, res, next) {
    if (
      typeof res.locals.inventory === "undefined" ||
      typeof res.locals.user === "undefined"
    ) {
      return next("no user/inventory item error");
    }

    var today = Date.now();
    rentedModel.findOne(
      {
        _item: res.locals.inventory._id,
        rented_already: true,
        date_from: { $lte: today},
        date_to: { $gte: today},
      },
      (err, rent) => {
        if (err) {
          return next(err);
        }

        if (!rent) {
          return next();
        }

        res.locals.error.push("Item can not be deleted! Currently rented.");
        return next();
      }
    );
  };
};
