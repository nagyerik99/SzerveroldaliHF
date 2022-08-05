/**
 * It gets the rentable item, which has the given rental_id.
 * Actually it just returns an other user's rentable item from the inventory.
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      return next();
    };
  
  };
  