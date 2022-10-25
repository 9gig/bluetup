const mongoose      = require('mongoose');
const {Schema}      = mongoose;
const uniqueValidator       = require('mongoose-unique-validator');

const reqString = {
    type: String,
    required: true
}

const challengeSchema = new Schema({
    userId: reqString,
    balance: reqString,
    startAmt:reqString,
    target:reqString,
    slot:reqString,
    startDate:reqString,
    
    transactions:[{
        type: Schema.Types.ObjectId,
        ref: 'Transactions'
    }],

},{timestamps:true});


const M_challenge = mongoose.model("M_challenge",challengeSchema);


module.exports = {M_challenge};