const { decodeBase64, encodeBase64 } = require('bcryptjs');
const mongoose      = require('mongoose');
const {Schema}      = mongoose;
const uniqueValidator       = require('mongoose-unique-validator');

const hasherSchema = new Schema({
    wallet:String,
    message:{},
    iv:{}
});

hasherSchema.set("toJSON",{
    transform:(document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
});
// hasherSchema.plugin(uniqueValidator,{message:"A user with this data already exits"});
const Hasher = mongoose.model("harsher", hasherSchema);
module.exports = Hasher;