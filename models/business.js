var mongoose = require('mongoose');

// DEFINE THE BUSINESS CONTACT INFORMATION SCHEMA
var businessSchema = new mongoose.Schema( {
    ContactName: String,
    ContactNumber:String,
    EmailAddress: String
});

// MAKE THIS PUBLIC SO THE CONTROLLER CAN SEE IT
module.exports = mongoose.model('Business', businessSchema);


