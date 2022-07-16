/**
 * Gets a given user, if capable
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {

      //TODO here i will access the db user entity by the id, stored in the express session.
      res.locals.user = {
        _id : '11',
        name : 'Teszt Elek',
        door_number : '19/B',
        email: 'tesztelek@teszt.hu'
      };

      return next();
    };
  
  };
  