/**
 * Deletes the selected rental request, as a sign of decline.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      if(typeof res.locals.request === 'undefined'){
        return next('No request object error');
      }

      res.locals.request.remove((err)=>{
        if(err){
          return next(err);
        }
        console.log("torolte");
        return res.redirect('/request');
      });
    };
  
  };
  