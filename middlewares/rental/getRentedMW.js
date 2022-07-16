/**
 * Returns all the previously and currently rented items information.
 * all the items, whats the user rented currently or previously
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      res.locals.renteditems = [
        {itemname: "ItemName1", type: "gadgets", date_from: new Date("2022/11/11"), date_to: new Date("2022/11/13")},
        {itemname: "ItemName2", type: "diy", date_from: new Date("2022/10/01"), date_to: new Date("2022/10/06") },
        {itemname: "ItemName3", type: "other", date_from: new Date("2022/05/05"), date_to: new Date("2022/06/01")},
      ];
      return next();
    };
  
  };
  