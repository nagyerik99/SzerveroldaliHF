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

module.exports = function (app) {
  var objectRepository = {};

  /**
   * Show user info page on account.html
   */
  app.get('/user/:userid',
    authMW(objectRepository),
    getUserMW(objectRepository),
    renderMW(objectRepository, 'user')
  );

  /**
   * Edit user data on accsettings.html
   */
  app.use('/user/:userid/edit',
    authMW(objectRepository),
    getUserMW(objectRepository),
    editUserMW(objectRepository),
    renderMW(objectRepository, 'user_edit')
  );

  /**
   * Delete user, if no-one rents, his/her items currently.
   */
  app.get('/user/:userid/del',
    authMW(objectRepository),
    getUserMW(objectRepository),
    getInventoryMW(objectRepository),
    checkRentalMW(objectRepository),
    delUserMW(objectRepository),
    //simple redirect
    function (req, res, next) {
      return res.redirect('/login');
    });

    /**
     * Login try
     */
  app.use('/login',
    inverseAuthMW(objectRepository),
    checkPasswordMW(objectRepository),
    renderMW(objectRepository,'login')
  );

  /**
   * New password request
   */
  app.use('/login/newpass',
    checkEmailMW(objectRepository),
    sendPasswordMW(objectRepository),
    renderMW(objectRepository,'newpass')
  );

  /**
   * Registration request
   */
  app.use('/registration',
    checkEmailMW(objectRepository),
    saveUserMW(objectRepository),
    renderMW(objectRepository, 'registration')
  );
};
