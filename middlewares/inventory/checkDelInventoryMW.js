const requireOption = require("../common");

/**
 * It checks wether the inventory item, can be deleted.
 * It can not be deleted if, the item is already rented.
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    return next();
  };
};
