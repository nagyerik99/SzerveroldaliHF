var express = require("express");
var app = express();

var session = require("express-session");
var bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(express.static("static"));

//item types for inventory items
const ItemType = {
  diy: "DIY",
  transport: "Transport",
  gadgets: "Gadgets",
  other: "Other",
};

/**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "veryvery secret key",
    cookie: {
      maxAge: 10 * 60000,
    },
    resave: true,
    saveUninitialized: false,
  })
);

app.use(function (req, res, next) {
  res.locals = {};
  res.locals.types = ItemType;
  res.locals.error = [];
  return next();
});

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send("Something broke!");
});

/**
 * Include all the routes
 */
require("./routes/userroutes")(app);
require("./routes/rentalroutes")(app);
require("./routes/inventoryroutes")(app);

var server = app.listen(3000, function () {
  console.log("On: 3000");
});
