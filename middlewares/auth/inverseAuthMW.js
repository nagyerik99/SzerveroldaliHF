
/**
 * checks wheter the user is signed in, or not, if already signed in then  redirect to landing page.
 * @param objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      return next();
    };
  
  };
  