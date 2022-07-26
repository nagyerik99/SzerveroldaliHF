const requireOption = require("../common");

/**
 * Returns all the previously and currently rented items information.
 * all the items, whats the user rented currently or previously
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      const rentedModel = requireOption(objectrepository, 'rentedModel');
    return function (req, res, next) {
      //return all the rented document where already_rented is true and the renter is the user
      if(typeof res.locals.user === 'undefined'){
        return next("No user error");
      }

      rentedModel.find({
        _renter: res.locals.user._id,
        rented_already: true,
      })
      .populate('_item')
      .exec((err, rentedItems)=>{
        if(err || !rentedItems){
          return next(err);
        }

        res.locals.rentedItems = rentedItems;

        return next();
      });
    };
  
  };
  