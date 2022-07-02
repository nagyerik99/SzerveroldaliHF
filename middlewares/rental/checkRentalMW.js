/**
 * Checks if the currently signed in and want to be deleted user has any item which is currently rented.
 * if not then the user is deletable.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      return next();
    };
  
  };
  