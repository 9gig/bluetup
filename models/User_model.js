const mongoose      = require('mongoose');
const {Schema}      = mongoose;
const uniqueValidator       = require('mongoose-unique-validator');



const reqString = {
    type: String,
    required: true
}
const reqUnqString = {
    type: String,
    required: true,
    unique: true
}

const walletSchema = new Schema({
    name:reqString,
    bal: reqString
},{
    timestamps: true
})

const kycSchema = new Schema({
    address:  reqString,
    country: reqString,
    state: reqString,
    city: reqString,
    docImage: reqString,
  
},{timestamps:true})

const personalSchema = new Schema({
    gender: reqString,
    dob: reqString,
    occupation: reqString,
},{timestamps:true})
const bvnSchema = new Schema({
    no: reqString,
},{timestamps:true})
const bankSchema= new Schema({
    acctNo: reqString,
    acctName: reqString,
    bankName: reqString
}, {timestamps:true})
const cardSchema = new Schema({
    serialNo: reqString,
    expDate: reqString,
    holderName: reqString
},{timestamps:true})
const kinSchema = new Schema({
    fullName: reqString,
    gender: reqString,
    email: reqString,
    phone: reqString,
    relationship: reqString,
    dob: reqString,
    address: reqString,
}, {timestamps:true})
const userSchema = new Schema({
    phone:reqUnqString,
    firstName:reqString,
    lastName:reqString,
    email:reqUnqString,
    password:reqString,
    avatar:String,
    personal:personalSchema,
    uID:reqUnqString,
    kyc:kycSchema,
    bvn: bvnSchema,
    bank: bankSchema,
    card:cardSchema,
    nextOfkin:kinSchema,
   
},{timestamps:true});


userSchema.statics.findByUserID = function(userID) {
    return this.where({uID:new RegExp(userID, "i")})
}


userSchema.set("toJSON",{
    transform:(document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
});
userSchema.plugin(uniqueValidator,{message:"A user with this data already exits"});
const User = mongoose.model("User", userSchema);
module.exports = User;