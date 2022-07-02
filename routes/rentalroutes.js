var authMW = require('../middlewares/auth/autMW');
var renderMW = require('../middlewares/auth/renderMW');

var getUserMW = require('../middlewares/user/getUserMW');
var getRequestsMW = require('../middlewares/request/getRequestsMW');
var getRequestMW = require('../middlewares/request/getRequestMW');
var saveRequestsMW = require('../middlewares/request/saveRequestsMW');
var delRequestMW = require('../middlewares/request/delRequestMW');
var getRentedMW = require('../middlewares/rental/getRentedMW');
var getRentalsMW = require('../middlewares/rental/getRentalsMW');
var getRentalMW = require('../middlewares/rental/getRentalMW');
var saveRentalMW = require('../middlewares/rental/saveRentalMW');



module.exports = function (app) {
  var objectRepository = {};

  /**
   * Show all rental request, for the user
   */
  app.get('/user/:userid/request',
    authMW(objectRepository),
    getUserMW(objectRepository),
    getRequestsMW(objectRepository),
    renderMW(objectRepository, 'request_list')
  );

  /**
   * Accept rental request
   */
  app.use('/user/:userid/request/edit/:requestid',
    authMW(objectRepository),
    getUserMW(objectRepository),
    getRequestMW(objectRepository),
    saveRequestsMW(objectRepository),
    function (req, res, next) {
        return res.redirect('/user/:userid/request');
      }  
  );

    /**
   * Decline/Delete rental request
   */
     app.get('/user/:userid/request/del/:requestid',
     authMW(objectRepository),
     getUserMW(objectRepository),
     getRequestMW(objectRepository),
     delRequestMW(objectRepository),
     function (req, res, next) {
        return res.redirect('/user/:userid/request');
     }  
   );

    /**
   * Show rented items for the user
   */
     app.get('/user/:userid/rented',
     authMW(objectRepository),
     getUserMW(objectRepository),
     getRentedMW(objectRepository),
     renderMW(objectRepository,'rented_list')
   );

    /**
   * Show rentable items for the user, all the items that currently avaiable and not the user's.
   */
    app.get('/',
     authMW(objectRepository),
     getUserMW(objectRepository),
     getRentalsMW(objectRepository),
     renderMW(objectRepository,'rentable_list'), 
    );

    /**
   * Show rentable items for the user, all the items that currently avaiable and not the user's.
   */
     app.get('/rental',
      authMW(objectRepository),
      getUserMW(objectRepository),
      getRentalsMW(objectRepository),
      renderMW(objectRepository,'rentable_list')
    );


    /**
     * Show rentable item details, where the user can send a rental request, for the owner.
     */
    app.use('/rental/:rentalid',
     authMW(objectRepository),
     getUserMW(objectRepository),
     getRentalMW(objectRepository),
     saveRentalMW(objectRepository),
     renderMW(objectRepository,'rentable_item')
    );
};
