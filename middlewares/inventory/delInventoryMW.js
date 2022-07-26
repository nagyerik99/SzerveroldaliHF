const requireOption = require("../common");

/**
 * Deletes the selected item from the users inventory
 * Delete all the rent requests where the item is this
 * @param {} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  const rentedModel = requireOption(objectrepository, "rentedModel");

  return function (req, res, next) {
    if (typeof res.locals.inventory === "undefined") {
      return next("no inventory item error");
    }

    if (res.locals.error.length !== 0){
      return next();
    }


      rentedModel.deleteMany({ _item: res.locals.inventory._id }, (err) => {
        if (err) {
          return next(err);
        }

        res.locals.inventory.remove((err) => {
          if (err) {
            return next(err);
          }

          return res.redirect("/inventory");
        });
      });
  };
};
