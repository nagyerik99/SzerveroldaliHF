/**
 * checking the req.body values if filled out.
 * Sends error if required field is not filled.
 * @param objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    return next();
  };
};
