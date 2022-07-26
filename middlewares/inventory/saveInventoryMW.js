const requireOption = require("../common");

/**
 * Saves the edited rentable item.
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  const itemModel = requireOption(objectrepository, 'itemModel');

  return function (req, res, next) {

    if(res.locals.user === 'undefined'){
      return next("No user error");
    }

    if (
      req.method !== "POST" ||
      typeof req.body.id === "undefined" ||
      typeof req.body.name === "undefined" ||
      typeof req.body.type === "undefined" ||
      res.locals.error.length !== 0
    ) {
      return next();
    }

    if(typeof res.locals.inventory === 'undefined'){
        res.locals.inventory = new itemModel();
    }

    res.locals.inventory.name = req.body.name;
    res.locals.inventory.type = req.body.type;
    res.locals.inventory._owner = res.locals.user;

    res.locals.inventory.save((err)=>{
      if(err){
        return next(err);
      }

      return res.redirect('/inventory');
    });
  };
};
