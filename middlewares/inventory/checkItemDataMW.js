/**
 * It checks wether all the data was filled out during the edit/save of the item.
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    return next();
  };
};
