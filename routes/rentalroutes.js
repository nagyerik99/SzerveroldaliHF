const authMW = require('../middlewares/auth/autMW');
const renderMW = require('../middlewares/auth/renderMW');

const getUserMW = require('../middlewares/user/getUserMW');
const getRequestsMW = require('../middlewares/request/getRequestsMW');
const getRequestMW = require('../middlewares/request/getRequestMW');
const saveRequestsMW = require('../middlewares/request/saveRequestsMW');
const delRequestMW = require('../middlewares/request/delRequestMW');
const getRentedMW = require('../middlewares/rental/getRentedMW');
const getRentalsMW = require('../middlewares/rental/getRentalsMW');
const getRentalMW = require('../middlewares/rental/getRentalMW');
const saveRentalMW = require('../middlewares/rental/saveRentalMW');
const inverseAuthMW = require('../middlewares/auth/inverseAuthMW');
const mainRedirectMW = require('../middlewares/auth/mainRedirectMW');
const checkRentalDataMW = require('../middlewares/rental/checkRentalDataMW');

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
    saveRequestsMW(objectRepository)
  );

    /**
   * Decline/Delete rental request
   */
     app.get('/request/del/:requestid',
     authMW(objectRepository),
     getUserMW(objectRepository),
     getRequestMW(objectRepository),
     delRequestMW(objectRepository)
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
     mainRedirectMW(objectRepository),
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
     checkRentalDataMW(objectRepository),
     saveRentalMW(objectRepository),//this will redirect if it was a post rental request.
     renderMW(objectRepository,'rentdetails')
    );
};
