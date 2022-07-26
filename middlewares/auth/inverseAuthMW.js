
/**
 * checks wheter the user is signed in, or not, if already signed in then  redirect to main page.
 * @param objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      if (typeof req.session.userid !== 'undefined') {
        return res.redirect('/');
      }
      return next();
    };
  
  };
  