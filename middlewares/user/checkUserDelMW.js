/**
 * Checks wheter te user has any kind of ongoing rentals or has any item that is under rental
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      const rentedModel = requireOption(objectrepository, 'rentedModel');
    return function (req, res, next) {
      return next();      
    };
  
  };
  