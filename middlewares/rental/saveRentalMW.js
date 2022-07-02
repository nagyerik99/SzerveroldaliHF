/**
 * If the user wants to rent a new item, then it creates a rental request, for the owner of the item, and after it is accepted,
 * it will be shown in the rented items
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      return next();
    };
  
  };
  