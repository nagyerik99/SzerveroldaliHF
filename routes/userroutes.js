const authMW = require('../middlewares/auth/autMW');
const renderMW = require('../middlewares/auth/renderMW');


const getUserMW = require('../middlewares/user/getUserMW');
const editUserMW = require('../middlewares/user/editUserMW');
const saveUserMW = require('../middlewares/user/saveUserMW');
const delUserMW = require('../middlewares/user/delUserMW');
const getInventoryMW = require('../middlewares/inventory/getInventoryMW');
const checkPasswordMW = require('../middlewares/auth/checkPasswordMW');
const checkEmailMW = require('../middlewares/auth/checkEmailMW');
const sendPasswordMW = require('../middlewares/auth/sendPasswordMW');
const inverseAuthMW = require('../middlewares/auth/inverseAuthMW');
const logoutMW = require('../middlewares/auth/logoutMW');
const checkRentalMW = require('../middlewares/rental/checkRentalMW');

const userModel = require('../models/user');
const rentedModel = require('../models/rented');
const itemModel = require('../models/item');
const inverseCheckEmailMW = require('../middlewares/auth/inverseCheckEmailMW');
const checkRegDataMW = require('../middlewares/auth/checkRegDataMW');
const checkUserDelMW = require('../middlewares/user/checkUserDelMW');

module.exports = function (app) {
  var objectRepository = {
    userModel : userModel,
    rentedModel : rentedModel,
    itemModel : itemModel
  };

  /**
   * Show user info page on account.html
   */
  app.get('/account',
    authMW(objectRepository),
    getUserMW(objectRepository),
    renderMW(objectRepository, 'account')
  );

  /**
   * Edit user data on accsettings.html
   */
  app.use('/account/edit',
    authMW(objectRepository),
    getUserMW(objectRepository),
    editUserMW(objectRepository),//this will redirect if this was a post request
    renderMW(objectRepository, 'accsettings')
  );

    app.get('/account/delete',
     authMW(objectRepository),
     getUserMW(objectRepository),
     checkUserDelMW(objectRepository),
     delUserMW(objectRepository), //if all works fine then redirect to landing page, else show error
     renderMW(objectRepository, 'accsettings')
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
    logoutMW(objectRepository),
    function(req, res, next){
      res.redirect("/");
     }
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
    checkRegDataMW(objectRepository),
    inverseCheckEmailMW(objectRepository),
    saveUserMW(objectRepository),
    renderMW(objectRepository, 'registration')
  );
};
