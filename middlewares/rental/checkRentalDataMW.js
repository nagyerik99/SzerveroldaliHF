const requireOption = require("../common");

/**
 * It checks wether all the data was filled out during the edit/save of the item.
 * @param {*} objectrepository
 * @returns
 */
 module.exports = function (objectrepository) {
    const itemModel = requireOption(objectrepository, 'itemModel');

    return function (req, res, next) {
      if (req.method !== "POST" || typeof req.params.rentalid ==='undefined') {
        return next();
      }
  
      if (req.body.date_from === "" || req.body.date_to === "") {
        res.locals.error.push("All fields are required");
        return next();
      }

      req.body.date_from = new Date(req.body.date_from);
      req.body.date_to = new Date(req.body.date_to);

      if (req.body.date_from >= req.body.date_to){
        res.locals.error.push('Date To must be greated than Date From !');
        return next();
      }

      itemModel.findOne({
        _id : req.params.rentalid
      })
      .populate('_rentals')
      .exec(function (err, item) {
        if(err || !item){
          return next(err);
        }

        item._rentals.forEach((rental)=>{
          let from = rental.date_from;
          let to = rental.date_to;

          if(req.body.date_from >= from && req.body.date_from <= to){
            res.locals.error.push(`Item is rented in the given interval !\n(from-to)${from.toDateString()} - ${to.toDateString()}`);
            return next();
          }

          if(req.body.date_to >= from && req.body.date_to <= to){
            res.locals.error.push(`Item is rented in the given interval !\n(from-to)${from.toDateString()} - ${to.toDateString()}`);
            return next();
          }

        });

        return next();
      });
      };
  };
  