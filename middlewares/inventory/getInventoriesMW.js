const requireOption = require("../common");

/**
 * Gets all the rentable item that was registered by the user.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
  const itemModel = requireOption(objectrepository, "itemModel");

    return function (req, res, next) {
      if(typeof res.locals.user === 'undefined'){
        return next("no user error");
      }

      itemModel.find({_owner: res.locals.user._id},(err,items)=>{
        if(err){
          return next(err);
        }

        res.locals.inventories = items;

        return next();
      });
    };
  
  };
  