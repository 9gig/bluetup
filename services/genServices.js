const General  = require("../models/general.model");
const User     = require("../models/User_model");



//service to add balance
async function addBalance(params, callback){
    const user  = await User.findOne({uID:params?.userId});
    if(user == null){
        return callback({message: "User not found"});

    }

    const gen   = await General.findOne({userId:params?.userId});
    if(gen == null){
        //Create new wallet for user
       const newGen = new General(params);
       newGen.save().then((response)=>{
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });
    }else{
        //Add to existing balance
        const oldBal = parseInt(gen.bal);
        const newBal = parseInt(params?.bal);
        const addedBal = oldBal+newBal;
        General.updateOne({userId:params?.userId}, {bal:addedBal}, {new: true});
            var d = await General.findOne({userId:params?.userId});
            return callback(null, d);
      


    }
}
//service to deduct balance
async function deduct(params, callback){
    const user  = await User.findOne({uID:params?.userId});
    if(user == null){
        return callback({message: "User not found"});
    }
    const gen   = await General.findOne({userId:params?.userId});
    const oldBal = parseInt(gen.bal);
    const newBal = parseInt(params?.bal);
   if(oldBal > newBal){
    const subBal = oldBal-newBal;
    General.updateOne({userId:params?.userId}, {bal:subBal}, {new: true}).then((response) =>{
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });
   }else{
    return callback({message: "Insufficient Balance"});
   }


}

//service to get total balance
async function getBalance(params, callback){
    const user  = await User.findOne({uID:params});
    if(user == null){
        return callback({message: "User not found"});
    }
    const gen   = await General.findOne({userId:params});
    if(gen != null){
        return callback(null, gen);
    }else{
        return callback({message: "empty"});
    }
}



//cash transc
//cash transc
//cash transc


module.exports = {
    addBalance,
    deduct,
    getBalance
}