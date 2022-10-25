const mongoose      = require('mongoose');
const {Schema}      = mongoose;
const uniqueValidator       = require('mongoose-unique-validator');

const reqString = {
    type: String,
    required: true
}

const savingSchema  = new Schema({ 
    userId:reqString,

     balance:reqString,
     intrestRate:{ type: String,},
     withdrawable:{ type: String,},
    payDay:{ type: String,},
    intrest:{ type: String,},
 
    transactions:[{
        type: Schema.Types.ObjectId,
        ref: 'Transactions'
    }],
    // totalIntrest:reqString,
    
    // aquiredIntrest:{
    //     type: String
    // },
   
    // interval:reqString,
   
    
},{timestamps:true});


// for admin
const makeSavingScchema  = new Schema({ 
    name:reqString,
    transactions:[{
        type: Schema.Types.ObjectId,
        ref: 'Transactions'
    }],
  
    intrestRate:reqString,
   
    
},{timestamps:true});

const SavingsProfile = mongoose.model("SavingsProfile", makeSavingScchema);
const BlueVault = mongoose.model("BlueVault", savingSchema);
const TupDollar = mongoose.model("TupDollar", savingSchema);
const FlexyNaira = mongoose.model("FlexyNaira", savingSchema);

module.exports = {SavingsProfile, BlueVault, TupDollar,FlexyNaira};






