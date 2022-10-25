const mongoose      = require('mongoose');
const {Schema}      = mongoose;
const uniqueValidator       = require('mongoose-unique-validator');

const reqString = {
    type: String,
    required: true
}

const referSchema = new Schema({
    uID: reqString,
    ref_link: reqString,
    code: reqString,
    referrals:[{type: String}]
},{timestamps:true});


const Refer = mongoose.model("Refer", referSchema);
module.exports = Refer;