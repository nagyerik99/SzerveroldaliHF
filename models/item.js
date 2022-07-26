var Schema = require('mongoose').Schema;
var db = require('../config/db');

var Item = db.model('Item', {
  name: String,
  type: String,
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _rentals: [//approved rental requests
    { type : Schema.Types.ObjectId, ref: 'Rented' }
  ]
});

module.exports = Item;