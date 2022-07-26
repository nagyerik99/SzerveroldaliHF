const requireOption = require("../common");

/**
 * Checks if the given password matches with the given eamil-address for user identification.
 * @param {} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
    const userModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

      if(typeof req.body.password === 'undefined' || typeof req.body.email === 'undefined'){
        return next();
      }


      userModel.findOne({
        email: req.body.email
      }, function(err,user){
        if(err || !user ){
          res.locals.error.push("Email is not registered!");
          return next();
        }

        if(user.password !== req.body.password){
          res.locals.error.push("Wrong email or password!");
          return next();
        }

        req.session.userid = user._id;

        return res.redirect('/');
      });

    };
  
  };
  