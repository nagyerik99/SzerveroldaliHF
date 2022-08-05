/**
 * Deletes a registered user.
 * Only if the user has no ongoing rental process and has no item that is currently under rental.
 * @param {} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      return next();
    };
  
  };
  