/**
 * Redirects the user from the landing page, if the user is already signed in.
 * Redirects to the users inventory page.
 * @param objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    return next();
  };
};
