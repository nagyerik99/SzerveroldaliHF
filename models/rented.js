var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Rented = db.model('Rented', {
    _owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    _renter: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    _item: {
        type: Schema.Types.ObjectId,
        ref: 'Item'
    },
    date_from: Date,
    date_to: Date,  
    rented_already: { type: Boolean, default: false }
    });


    module.exports = Rented;