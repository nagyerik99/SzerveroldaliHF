const requireOption = require("../common");

/**
 * Gets all the information of a given rentable item. (for editing)
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  const itemModel = requireOption(objectrepository, "itemModel");

  return function (req, res, next) {
    if (
      typeof req.params.inventoryid === "undefined" ||
      res.locals.user === "undefined"
    ) {
      return next("No user or inventoryid error!");
    }

    itemModel.findOne(
      { _id: req.params.inventoryid, _owner: res.locals.user._id },
      (err, item) => {
        if (err || !item) {
          return next(err);
        }

        res.locals.inventory = item;

        return next();
      }
    );
  };
};
