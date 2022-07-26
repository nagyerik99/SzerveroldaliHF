/**
 * It checks wether all the data was filled out during the edit/save of the item.
 * @param {*} objectrepository
 * @returns
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    if (req.method !== "POST") {
      return next();
    }

    if (req.body.name === "" || req.body.type === "") {
      res.locals.error.push("All fields are required");
    }

    if (!(req.body.type in res.locals.types)) {
      res.locals.error.push("Type must be one of the given options!");
    }

    return next();
  };
};
