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
  app.get('/request',
    authMW(objectRepository),
    getUserMW(objectRepository),
    getRequestsMW(objectRepository),
    renderMW(objectRepository, 'requests')
  );

  /**
   * Accept rental request get/post if body undefined then get else post
   */
  app.use('/request/edit/:requestid',
    authMW(objectRepository),
    getUserMW(objectRepository),
    getRequestMW(objectRepository),
    saveRequestsMW(objectRepository),
    function(req, res, next){
      res.redirect("/request");
    }
  );

    /**
   * Decline/Delete rental request
   */
     app.get('/request/del/:requestid',
     authMW(objectRepository),
     getUserMW(objectRepository),
     getRequestMW(objectRepository),
     delRequestMW(objectRepository),
     function(req, res, next){
      res.redirect("/request");
    }
   );

    /**
   * Show rented items for the user
   */
     app.get('/rented',
     authMW(objectRepository),
     getUserMW(objectRepository),
     getRentedMW(objectRepository),
     renderMW(objectRepository,'renteditems')
   );

    /**
   * Show landingpage for the user if not registered or logged in
   */
    app.get('/',
     authMW(objectRepository),
     renderMW(objectRepository,'index') 
    );

    /**
   * Show rentable items for the user, all the items that currently avaiable and not the user's.
   */
     app.get('/rental',
      authMW(objectRepository),
      getUserMW(objectRepository),
      getRentalsMW(objectRepository),
      renderMW(objectRepository,'rental')
    );


    /**
     * Show rentable item details, where the user can send a rental request, for the owner.
     */
    app.use('/rental/rent/:rentalid',
     authMW(objectRepository),
     getUserMW(objectRepository),
     getRentalMW(objectRepository),
     saveRentalMW(objectRepository),//this will redirect if it was a post rental request.
     renderMW(objectRepository,'rentdetails')
    );
};
