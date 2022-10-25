const mongoose      = require('mongoose');
const {Schema}      = mongoose;
const uniqueValidator       = require('mongoose-unique-validator');


const reqString = {
    type: String,
    required: true
}

const invDealSchema = new Schema({
    name:reqString,
    totalUnit:reqString,
    cost:reqString,
    returns:reqString,
    invType:reqString,
    duration:reqString,
    invSector:reqString,
    location:reqString,
    insurancePatner:String,
    payoutType:String,
    unitType:String,
    investors:String,
    video:String,
    assets:[{
        type: String,
      }],
    cloudinary_id:[ {
        type: String,
      }],
}, {timestamps:true});
const Deals = mongoose.model("Deals", invDealSchema);

module.exports = Deals;