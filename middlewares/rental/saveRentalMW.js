const requireOption = require("../common");

/**
 * If the user wants to rent a new item, then it creates a rental request, for the owner of the item, and after it is accepted,
 * it will be shown in the rented items
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  const rentedModel = requireOption(objectrepository, "rentedModel");

  return function (req, res, next) {
    if (req.method !== "POST" || res.locals.error.length !== 0) {
      return next();
    }

    if (
      typeof res.locals.user === "undefined" ||
      typeof res.locals.rental === "undefined"
    ) {
      return next("No user/rental item error");
    }

    res.locals.rent = new rentedModel();

    res.locals.rent._owner = res.locals.rental._owner;
    res.locals.rent._renter = res.locals.user;
    res.locals.rent._item = res.locals.rental;
    res.locals.rent.date_from = req.body.date_from;
    res.locals.rent.date_to = req.body.date_to;

    res.locals.rent.save((err)=>{
      if(err){
        return next(err);
      }

      return res.redirect('/rental');
    });
  };
};
