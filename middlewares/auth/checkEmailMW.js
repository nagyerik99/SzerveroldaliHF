/**
 * checking the given eamil on forgot password and if not in database, then sends warning.
 * else save to res.locals the users password
 * @param objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      return next();
    };
  
  };
  