var authMW = require('../middlewares/auth/autMW');
var renderMW = require('../middlewares/auth/renderMW');
var getInventoriesMW = require('../middlewares/inventory/getInventoriesMW');
var getInventoryMW = require('../middlewares/inventory/getInventoryMW');
var saveInventoryMW = require('../middlewares/inventory/saveInventoryMW');
var delInventoryMW = require('../middlewares/inventory/delInventoryMW');
var getUserMW = require('../middlewares/user/getUserMW');


module.exports = function (app) {
  var objectRepository = {};

  /**
   * Show all registered rentable item
   */
  app.get('/user/:userid/inventory',
    authMW(objectRepository),
    getUserMW(objectRepository),
    getInventoriesMW(objectRepository),
    renderMW(objectRepository, 'inventory')
  );

  /**
   * Add inventory item
   */
   app.use('/user/:userid/inventory/new',
   authMW(objectRepository),
   getUserMW(objectRepository),
   saveInventoryMW(objectRepository),//this will redirect if this was a post request 
   renderMW(objectRepository, 'newitem')
 );

    /**
   * Edit inventory item
   */
     app.use('/user/:userid/inventory/edit/:inventoryid',
     authMW(objectRepository),
     getUserMW(objectRepository),
     getInventoryMW(objectRepository),
     saveInventoryMW(objectRepository),//this will redirect if this was a post request 
     renderMW(objectRepository, 'newitem')
 
   );

  /**
   * Delete inventory item
   */
  app.get('/user/:userid/inventory/del/:inventoryid',
    authMW(objectRepository),
    getUserMW(objectRepository),
    getInventoryMW(objectRepository),
    delInventoryMW(objectRepository)//redirect to the inventory page
    );
};
