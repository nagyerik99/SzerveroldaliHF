/**
 * For accepting a rental request.
 * It saves the item as rented for the renter.
 * After the rental is overdue it will be shown as rentable again.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      if(typeof res.locals.request === 'undefined'){
        return next('No request error');
      }

      res.locals.request.rented_already = true;
      res.locals.request.save((err)=>{
        if(err){
          return next(err);
        }
        res.locals.request._item._rentals.push(res.locals.request._id);
        res.locals.request._item.save((err)=>{
          if(err){
            return next(err);
          }

          return res.redirect("/request");
        });
      });
    };
  
  };
  