const mongoose      = require('mongoose');
const {Schema}      = mongoose;
const uniqueValidator       = require('mongoose-unique-validator');

const reqString = {
    type: String,
    required: true
}

const investSchema    = new Schema({
  
    userId:reqString,
   invDetails:{type:Schema.Types.ObjectId,
     ref: 'Deals'},
    capital:reqString,
    bal:reqString,
    profit:String,
    unitsHeld:String,
    dInt:reqString,
    durationMonths:reqString,
    uppieDated:reqString,
    interval:reqString,
    startDate:String,
    endDate:String,
    nextWithdrawal:[]
     
}, {timestamps:true});


const Investments = mongoose.model("Investments", investSchema);
module.exports = Investments;