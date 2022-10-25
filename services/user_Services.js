const User  = require("../models/User_model");
const Savings   = require('../models/savings.model');
const auth  = require("../middlewares/🔐");
const bcrypt = require("bcryptjs");
const { head } = require("../routes/user.routes");


//Register Service
async function register(params,plan, callback){
    if(params.phone === undefined || params.email === undefined){
        return callback({message:"Some fields are missing"});
    }
    const user = new User(params);
    const bluv = new Savings.BlueVault(plan);
    const tupD = new Savings.TupDollar(plan);
    const flexy = new Savings.FlexyNaira(plan);


    //User reg
    user.save().then((response)=>{
        //blue vault
  
        bluv.save({
            saveName:'Blue Vault',
            balance:plan.balance,
            payDay:plan.payDay,
            userId:plan.userId
        });
        tupD.save({
            saveName:'Tup Dollar',
            balance:plan.balance,
            payDay:plan.payDay,
            userId:plan.userId
        });
         // Flexy naira
    flexy.save(
        {
            saveName:'Flexy Naira',
            balance:plan.balance,
            payDay:plan.payDay,
            userId:plan.userId
        }
    )
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });


}


//Login Service
async function login({phone, password}, callback){
    const user = await User.findOne({phone});
    if(user != null){
            if(bcrypt.compareSync(password, user.password)){
                const token = auth.generateAccessToken(phone);
                return callback(null, {...user.toJSON(), token});
            }else{
                return callback({
                    message: "Invalid Password"
                });
            }
    } else{
        return callback({
            message:"User not Found"
        });
    }

   
   
}

// async function updatePersonal(params, callback){
//     if(params.Uid === undefined){
//         return callback({message:"Some fields are missing"});
//     }
//     const uid = params.Uid
//     const user = await User.findOneAndUpdate({uID:uid}, {personal: params}, {new: true}).then((response)=>{
//         return callback(null, response);
//     }).catch((error)=>{
//         return callback(error);
//     });
// }

async function updatePersonal(params, callback){
    if(params.Uid === undefined){
        return callback({message:"Some fields are missing"});
    }
    const uid = params.Uid
    const user = await User.findOneAndUpdate({uID:uid}, {personal: params}, {new: true}).then((response)=>{
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });
}

// Add Next of Kin
async function addKin(params, callback){
    if(params.Uid === undefined){
        return callback({message:"Some fields are missing"});
    }
    const uid = params.Uid
    const user = await User.findOneAndUpdate({uID:uid}, {nextOfkin: params}, {new: true}).then((response)=>{
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });

}



module.exports = {
    register,
    login,
    updatePersonal,
    addKin
}