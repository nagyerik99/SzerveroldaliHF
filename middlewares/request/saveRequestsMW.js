/**
 * For accepting a rental request.
 * It saves the item as rented for the renter.
 * After the rental is overdue it will be shown as rentable again.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      return next();
    };
  
  };
  