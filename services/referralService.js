const Refer = require("../models/refer.model");
const User  = require("../models/User_model");

async function create(params,callback){
    const userID = params.uID;
    const user = await User.findOne({uID:userID});

    if(user == null){
        return callback({
            message:"User not Found"
        });
    }
    

    const refer = new Refer(params);
    refer.save().then((va) => {return callback(null, true)});
}
async function add(params,callback){
    const userID = params.uID;//check if user was signed up
    const referee = await Refer.findOne({code:params.ref}); // check if refree exists

    if(referee == null){
        return callback({
            message:"Referee not Found"
        });
    }

    Refer.updateOne({code:params.ref}, {$push:{"referrals":params.uID}}, {new: true}).then((responds)=>{
        return callback(null, true);
    }).catch((error)=>{
        return callback(error);
    });
    
}


async function getRef(params,callback){
    const userID = params;
    const refe = await Refer.findOne({uID:userID}).then((resp)=>{
        return callback(null, resp);
    }).catch((err)=>{
        return callback(err);
    });
}

module.exports = {create, add, getRef};