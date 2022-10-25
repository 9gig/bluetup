const mongoose      = require('mongoose');
const {Schema}      = mongoose;
const uniqueValidator       = require('mongoose-unique-validator');

const reqString = {
    type: String,
    required: true
}

const generalWalletSchema = new Schema({
    title:reqString,
    bal: reqString,
    userId:reqString,
    

}, {timestamps:true});
const General = mongoose.model("General", generalWalletSchema);
module.exports = General;