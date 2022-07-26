const requireOption = require("../common");

/**
 * Gets a given rental request, for editing or deleting purpose.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      const rentedModel = requireOption(objectrepository, 'rentedModel');

    return function (req, res, next) {
      if(typeof req.params.requestid === 'undefined' || typeof res.locals.user === 'undefined'){
        return next("No user/param error");        
      }

      rentedModel.findOne({
        _id: req.params.requestid
      })
      .populate('_item')
      .exec((err, request)=>{
        if(err || !request){
          return next(err);
        }
        res.locals.request = request;

        return next();
      });
    };
  
  };
  