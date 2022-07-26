const requireOption = require("../common");

/**
 * Deletes a registered user.
 * Only if the user has no ongoing rental process and has no item that is currently under rental.
 * @param {} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
  const itemModel = requireOption(objectrepository, 'itemModel');
  const userModel = requireOption(objectrepository, 'userModel');
  const rentedModel = requireOption(objectrepository, 'rentedModel');

  return function (req, res, next) {
      if(typeof res.locals.user === 'undefined'){
        return next(err);
      }

      if(res.locals.error.length !== 0){
        return next();
      }

      rentedModel.deleteMany({
        $or: [
          {_renter: res.locals.user._id},
          {_owner: res.locals.user._id}
        ]
      },(err)=>{
        if(err){
          return next(err);
        }

        itemModel.deleteMany({
          _owner: res.locals.user._id
        },(err)=>{
          if(err){
            return next(err);
          }

          res.locals.user.remove((err)=>{
            if(err){
              return next(err);
            }

            req.session.destroy(function (err) {
              res.redirect('/');
            });
          });
        });
      });
    };
  
  };
  