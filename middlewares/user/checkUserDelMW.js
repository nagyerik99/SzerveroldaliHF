const requireOption = require("../common");

/**
 * Checks wheter te user has any kind of ongoing rentals or has any item that is under rental
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      const rentedModel = requireOption(objectrepository, 'rentedModel');
    return function (req, res, next) {
      if(typeof res.locals.user === 'undefined'){
        return next("no user error");
      }
      
      //He is the renter or the owner and its an ongoing rent
      var today = Date.now();
      rentedModel.findOne({
        $or: [
            {_renter: res.locals.user._id},
            {_owner: res.locals.user._id},
        ],
        rented_already: true,
        date_from: { $lte: today },
        date_to: { $gte: today },
      },(err, result)=>{
        if(err){
            return next(err);
        }

        if(!result){
            return next();
        }

        res.locals.error.push("Can't delete user, because has a rental process in progress..");
        return next();
      });      
    };
  
  };
  