var authMW = require('../middlewares/auth/autMW');
var renderMW = require('../middlewares/auth/renderMW');


var getUserMW = require('../middlewares/user/getUserMW');
var editUserMW = require('../middlewares/user/editUserMW');
var saveUserMW = require('../middlewares/user/saveUserMW');
var delUserMW = require('../middlewares/user/delUserMW');
var getInventoryMW = require('../middlewares/inventory/getInventoryMW');
var checkRentalMW = require('../middlewares/rental/checkRentalMW');
var checkPasswordMW = require('../middlewares/auth/checkPasswordMW');
var checkEmailMW = require('../middlewares/auth/checkEmailMW');
var sendPasswordMW = require('../middlewares/auth/sendPasswordMW');
var inverseAuthMW = require('../middlewares/auth/inverseAuthMW');
var logoutMW = require('../middlewares/auth/logoutMW');

module.exports = function (app) {
  var objectRepository = {};

  /**
   * Show user info page on account.html
   */
  app.get('/user/:userid/account',
    authMW(objectRepository),
    getUserMW(objectRepository),
    renderMW(objectRepository, 'account')
  );

  /**
   * Edit user data on accsettings.html
   */
  app.use('/user/:userid/edit',
    authMW(objectRepository),
    getUserMW(objectRepository),
    editUserMW(objectRepository),//this will redirect if this was a post request
    renderMW(objectRepository, 'accsettings')
  );

  /**
   * Delete user, if no-one rents, his/her items currently.
   */
  app.get('/user/:userid/del',
    authMW(objectRepository),
    getUserMW(objectRepository),
    getInventoryMW(objectRepository),
    checkRentalMW(objectRepository),
    delUserMW(objectRepository)//redirect to the landing page
    );

    /**
     * Login try
     */
  app.use('/login',
    inverseAuthMW(objectRepository),//redirect if already logged in
    checkPasswordMW(objectRepository),//redirect on post 
    renderMW(objectRepository,'login')
  );

  app.get('/logout',
    authMW(objectRepository),
    logoutMW(objectRepository)//redirect to the landing page
  );

  /**
   * New password request
   */
  app.use('/newpass',
    inverseAuthMW(objectRepository),//redirect if already logged in
    checkEmailMW(objectRepository),
    sendPasswordMW(objectRepository),//redirect to the /login page after post request
    renderMW(objectRepository,'newpass')
  );

  /**
   * Registration request
   */
  app.use('/registration',
    inverseAuthMW(objectRepository),
    checkEmailMW(objectRepository),
    saveUserMW(objectRepository),
    renderMW(objectRepository, 'registration')
  );
};
