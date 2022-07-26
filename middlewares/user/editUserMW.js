/**
 * Edit a gicen users informations like email, name, doornumber or password.
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    console.log(req.body);
    if (
      req.method !== "POST" ||
      typeof req.body.name === 'undefined' ||
      typeof req.body.email === 'udnefined' ||
      typeof req.body.door_number === 'undefined'
    ) {
      console.log("ide lep be");
      return next();
    }

    if (
      req.body.name === "" ||
      req.body.email === "" ||
      req.body.door_number === ""
    ) {
      res.locals.error.push("All fields are required!");
      return next();
    }

    res.locals.user.name = req.body.name;
    res.locals.user.email = req.body.email;
    res.locals.user.door_number = req.body.door_number;

    res.locals.user.save((err)=>{
      if(err){
        return next(err);
      }

      return res.redirect('/account');
    });
  };
};
