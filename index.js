var express = require('express');
var app = express();

var session = require('express-session');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.use(express.static('static'));

app.use(session({
    secret: 'veryvery secret key',
    cookie: {
      maxAge: 60000
    },
    resave: true,
    saveUninitialized: false
  }));

  /**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * Include all the routes
 */
 require('./routes/userroutes')(app);
 require('./routes/rentalroutes')(app);
 require('./routes/inventoryroutes')(app);



var server = app.listen(3000,function(){
    console.log("On: 3000");
});