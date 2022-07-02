var express = require('express');
var app = express();

/**
 * Include all the routes
 */
 require('./routes/userroutes')(app);
 require('./routes/rentalroutes')(app);
 require('./routes/inventoryroutes')(app);


app.use(express.static('static'));

var server = app.listen(3000,function(){
    console.log("On: 3000");
});