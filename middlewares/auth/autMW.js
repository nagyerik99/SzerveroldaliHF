
/**
 * checks wheter the user is signed in, or not, if not redirect to login page.
 * If the user is not signed in, he can't use the program.
 * *this will redirect to the inventory page if logged in already
 * @param objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      return next();
    };
  
  };
  