/**
 * Returns all the rentable item, currently available for the given user. 
 * (All the currently not rented item, which is not the user's)
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      res.locals.rentals = [
        {
          _id: 1,
          name: 'ItemName1',
          type: 'gadgets'
        },
        {
          _id: 2,
          name: 'ItemName2',
          type: 'diy'
        },
        {
          _id: 3,
          name: 'ItemName3',
          type: 'other'
        },
        {
          _id: 4,
          name: 'ItemName4',
          type: 'transport'
        },
        {
          _id: 5,
          name: 'ItemName5',
          type: 'gadgets'
        },
        {
          _id: 6,
          name: 'ItemName6',
          type: 'other'
        },
        {
          _id: 7,
          name: 'ItemName7',
          type: 'gadgets'
        },
      ];
      return next();
    };
  
  };
  