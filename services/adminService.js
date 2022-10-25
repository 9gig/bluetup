const auth  = require("../middlewares/🔐");
const User  = require("../models/User_model");
const Deals = require('../models/deals.model');
const Savings   = require('../models/savings.model');
const Logger = require("../models/admin_pass.model");
const Investments    = require("../models/invest.model");

const bcrypt = require("bcryptjs");



//Add new deal
async function addDeal(params,callback){
    var newDeal =  new Deals(params);
    newDeal.save().then((response)=>{
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });
}

//adding savings profile
async function addSavings(params, callback){
    var saving =  new Savings.SavingsProfile(params);
    saving.save().then((response)=>{
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    }); 
}

//GEt all Users 
async function getAllUsers(callback){
    const users = await User.find({});
    if(users == null){
        return callback({
            message:"No users found"
        });
    }
    return callback(null, users);
}

//GEt All deals
async function getAllDeals(callback){
    const deals = await Deals.find({});
    if(deals == null){
        return callback({
            message:"No Deals found"
        });
    }
    return callback(null, deals);
}

//get all Investments
async function getAllInvestments(callback){
    const invz = await Investments.find({});
    if(invz == null){
        return callback({
            message:"No Investment found"
        });
    }
    return callback(null, invz);
    
}


// GEt all savings
async function getAllSavings(callback){
    const savy = await Savings.SavingsProfile.find({});
    if(savy == null){
        return callback({
            message:"No Savings found"
        });
    }
    return callback(null, savy);
}



async function setPass(params,callback){
    //check who is logging in
    const logger = await Logger.findOne({logger:params.logger});
    if(logger == null){
        var newLogger =  new Logger(params);
        newLogger.save().then((response)=>{
            return callback(null, response);
        }).catch((error)=>{
            return callback(error);
        });
    }else{

        //Update password
        
        Logger.updateOne({logger:params.logger},{password:params.password}).then((response)=>{
            return callback(null, response);
        }).catch((error)=>{
            return callback(error);
        });
    }

}

async function login(params,callback){
    const logger = await Logger.findOne({logger:params.logging});
    if(logger  == null){
        
        return callback({
            message:"Logger not Found"
        });
           
    } else{
        // console.log(logger);
         if(bcrypt.compareSync(params.password, logger.password)){
                // const token = auth.generateAccessToken(phone);
                return callback(null, {...logger.toJSON()});
            }else{
                return callback({
                    message: "Invalid Password"
                });
            }
       
    }
}


//Exporting
module.exports ={
    addDeal,
    addSavings,
    getAllUsers,
    getAllDeals,
    getAllInvestments,
    getAllSavings,
    setPass,
    login
}