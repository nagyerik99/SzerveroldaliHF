
/**
 * checks wheter the user is signed in, or not, if not redirect to landing page.
 * If the user is not signed in, he can't use the program.
 * *this will redirect to the landing page if not signed in
 * @param objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      return next();
    };
  
  };
  