/**
 * Gets all the rentable item that was registered by the user.
 * @param {*} objectrepository 
 * @returns 
 */
module.exports = function (objectrepository) {
      
    return function (req, res, next) {
      req.session.userid = "teszelek";
      res.locals.inventories = [
        {_id: "1", name : "ItemName1", type: "diy"},
        {_id: "2", name : "ItemName2", type: "gadgets"},
        {_id: "3", name : "ItemName3", type: "other"},
        {_id: "4", name : "ItemName4", type: "transport"},
      ];

      return next();
    };
  
  };
  