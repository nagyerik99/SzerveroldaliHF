const authMW = require('../middlewares/auth/autMW');
const renderMW = require('../middlewares/auth/renderMW');
const getInventoriesMW = require('../middlewares/inventory/getInventoriesMW');
const getInventoryMW = require('../middlewares/inventory/getInventoryMW');
const saveInventoryMW = require('../middlewares/inventory/saveInventoryMW');
const delInventoryMW = require('../middlewares/inventory/delInventoryMW');
const getUserMW = require('../middlewares/user/getUserMW');

const userModel = require('../models/user');
const rentedModel = require('../models/rented');
const itemModel = require('../models/item');
const checkItemDataMW = require('../middlewares/inventory/checkItemDataMW');
const checkDelInventoryMW = require('../middlewares/inventory/checkDelInventoryMW');

module.exports = function (app) {
  var objectRepository = {
    userModel : userModel,
    rentedModel : rentedModel,
    itemModel : itemModel
  };

  /**
   * Show all registered rentable item
   */
  app.get('/inventory',
    authMW(objectRepository),
    getUserMW(objectRepository),
    getInventoriesMW(objectRepository),
    renderMW(objectRepository, 'inventory')
  );

  /**
   * Add inventory item
   */
   app.use('/inventory/new',
   authMW(objectRepository),
   getUserMW(objectRepository),
   checkItemDataMW(objectRepository),
   saveInventoryMW(objectRepository),//this will redirect if this was a post request 
   renderMW(objectRepository, 'newitem')
 );

    /**
   * Edit inventory item
   */
     app.use('/inventory/edit/:inventoryid',
     authMW(objectRepository),
     getUserMW(objectRepository),
     checkItemDataMW(objectRepository),
     getInventoryMW(objectRepository),
     saveInventoryMW(objectRepository),//this will redirect if this was a post request 
     renderMW(objectRepository, 'newitem')
 
   );

  /**
   * Delete inventory item
   */
  app.get('/inventory/del/:inventoryid',
    authMW(objectRepository),
    getUserMW(objectRepository),
    getInventoryMW(objectRepository),
    checkDelInventoryMW(objectRepository),
    delInventoryMW(objectRepository), //this is the one that redirects
    getInventoriesMW(objectRepository), //if the del does not redirect that means cant delete item
    renderMW(objectRepository, 'inventory')
    );
};
