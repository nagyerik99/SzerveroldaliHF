
/**
 * logs out the user
 * @param objectrepository 
 * @returns 
 */
 module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      req.session.destroy(function (err) {
        return next();
      });
    };
  
  };
  