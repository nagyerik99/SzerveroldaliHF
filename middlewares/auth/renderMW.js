/**
 * Using the template engine, to render the values into the template.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository, ejsfile) {
      
    return function (req, res, next) {
      res.locals.pagetitle = ejsfile;
      res.render(ejsfile,res.locals);
    };
  
  };
  