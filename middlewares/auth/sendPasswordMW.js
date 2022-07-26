/**
 * Sends the password for the given email address, for the forgotpassword method.
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (
      typeof res.locals.userpass === "undefined" ||
      typeof req.body === "undefined"
    ) {
      return next();
    } else {
      console.log(
        `email: ${req.body.email} \n password: ${res.locals.userpass}`
      );
      res.locals.error.push("Email sent!");
      return next();
    }
  };
};
