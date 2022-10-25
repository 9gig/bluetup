const mongoose      = require('mongoose');
const {Schema}      = mongoose;
const uniqueValidator       = require('mongoose-unique-validator');

const reqString = {
    type: String,
    required: true
}

const adminPassSchema = new Schema({
    logger:reqString,
    password:reqString

}, {timestamps:true});

const Logger = mongoose.model("Logger", adminPassSchema);

module.exports = Logger;
