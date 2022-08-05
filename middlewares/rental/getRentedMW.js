/**
 * Returns all the previously and currently rented items information.
 * all the items, whats the user rented currently or previously
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      //return all the rented document where already_rented is true and the renter is the user
      return next();
    };
  
  };
  