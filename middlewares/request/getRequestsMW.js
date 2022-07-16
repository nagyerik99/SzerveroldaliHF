/**
 * Gets all the rental requests that the current user has.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {

      res.locals.requests = [
        {
        _id: "1",
        renter: {name: 'Renter Name1', door_number: '1A'},
        item: {name: 'ItemName'},
        date_from: "2022-11-11",
        date_to: "2022-11-12"
        },
        {
          _id: "2",
          renter: {name: 'Renter Name2', door_number: '2B'},
          item: {name: 'ItemName'},
          date_from: "2022-11-11",
          date_to: "2022-11-12"
        },
        {
          _id: "3",
          renter: {name: 'Renter Name3', door_number: '3C'},
          item: {name: 'ItemName2'},
          date_from: "2022-11-13",
          date_to: "2022-11-22"
        }
      ];

      return next();
    };
  
  };
  