/**
 * Gets all the information of a given rentable item. (for editing)
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      //todo itt lesz a db lekeres
      res.locals.inventory =
      {_id: "1", name : "ItemName1", type: "gadgets"};

      return next();
    };
  
  };
  