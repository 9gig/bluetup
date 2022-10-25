const Savings   = require('../models/savings.model');
const User  = require("../models/User_model");


async function addSavings(userId,params, callback){
    const userID = userId;
    const user = await User.findOne({uID:userID});
    if(user != null){
var type = params.type;
var pld = await Savings.SavingsProfile.findById(params.id);//gets hold of the plan by ID
var rate =parseInt( pld.intrestRate);//gets plans intrest rate
var balance =parseInt(params.amt);// GEts amount from parameters
var intr = balance*rate / 100;//Intrest to be Earned
var finalBalance = balance + intr;// Withdrawable balance on payout day


//Calculating date of withdrawal
var date = new Date();
var last = new Date(date.getTime() + (121* 24 * 60 * 60 * 1000));
var day = last.getDate();
var month = last.getUTCMonth()+1;
var year = last.getFullYear();
var finalDay = day+"/"+month+"/"+year;// Pay day


if(type == 'Blue Vault'){
    //calc intrest with amount
  var plan = await Savings.BlueVault.findOne({userId:userID});
  var bal = parseInt(plan.balance);
  var nntr = parseInt(plan.intrest);
  var nnW = parseInt(plan.withdrawable);
    var newTr = nntr + intr;
    var newW = nnW + finalBalance;
    var newB = balance + bal;

    Savings.BlueVault.updateOne( {userId:userID},{ balance: newB, payDay: bal > 0? plan.payDay : finalDay,withdrawable:newW,  intrest:newTr,},{new: true}).then((response) =>{
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });
    // console.log(plan);
}
if(type == 'Tup Dollar'){
    var plan = await Savings.TupDollar.findOne({userId:userID});
  var bal = parseInt(plan.balance);
  var nntr = parseInt(plan.intrest);
  var nnW = parseInt(plan.withdrawable);
    var newTr = nntr + intr;
    var newW = nnW + finalBalance;
    var newB = balance + bal;

    

    Savings.TupDollar.updateOne( {userId:userID},{ balance: newB, payDay: bal > 0? plan.payDay : finalDay,withdrawable:newW,  intrest:newTr,},{new: true}).then((response) =>{
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });
}
if(type == 'Flexy Naira'){
    var plan = await Savings.FlexyNaira.findOne({userId:userID});
  var bal = parseInt(plan.balance);
  var nntr = parseInt(plan.intrest);
  var nnW = parseInt(plan.withdrawable);
    var newTr = nntr + intr;
    var newW = nnW + finalBalance;
    var newB = balance + bal;

    Savings.FlexyNaira.updateOne( {userId:userID},{ balance: newB, payDay: bal > 0? plan.payDay : finalDay,withdrawable:newW,  intrest:newTr,},{new: true}).then((response) =>{
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });
}
        //check to see type
       
   }else{
        return callback({
            message:"User not Found"
        });
    }

}


// update many documents in an array
async function updateMany(params, callback){
    
}

// purchase investment via Card
async function purchaseViaCard(params, callback){

}

//withdraw to bank
async function withdrawToBank(params, callback){

}

//withdraw to wallet
async function withdrawToWallet(params, callback){

}

async function getUserSavingsProfile(userId,callback){
    const id = userId;
    const user = await User.findOne({uID:id});
   
    if(user != null){
        const blvProfile = await Savings.BlueVault.findOne({userId:id});
        const flxProfile = await Savings.FlexyNaira.findOne({userId:id});
        const tpDProfile = await Savings.TupDollar.findOne({userId:id});
    
       // get all balances
       var blv = parseInt(blvProfile.balance);
       var flx= parseInt(flxProfile.balance);
       var tpD = parseInt(tpDProfile.balance);
    //get withdrawable

    var blvCollect =  parseInt(blvProfile.withdrawable);
    var flxCollect =  parseInt(flxProfile.withdrawable);
    var tpDCollect =  parseInt(tpDProfile.withdrawable);

//get Intrests
var blvIntr =  parseInt(blvProfile.intrest);
var flxIntr =  parseInt(flxProfile.intrest);
var tpDIntr =  parseInt(tpDProfile.intrest);

       //total balnce
       var totalBalance = blv + flx+tpD;
       //total Withdrawable
       var totalWithdrawable = blvCollect+flxCollect+tpDCollect;
       //Total Intrests
       var totalIntrest = blvIntr+flxIntr+tpDIntr;

       var profile = {
        tB:totalBalance,
        tW:totalWithdrawable,
        tR:totalIntrest,
        details: [
            blvProfile,
            flxProfile,
            tpDProfile
        ]
       }


      return callback(null, profile);
    
    }else{
        return callback({
            message:"User not Found"
        });
    }
  

}










//Exporting
module.exports ={
    addSavings,
    getUserSavingsProfile
}












// function getFormattedDate(date) {
//     var year = date.getFullYear();
  
//     var month = (1 + date.getMonth()).toString();
//     month = month.length > 1 ? month : '0' + month;
  
//     var day = date.getDate().toString();
//     day = day.length > 1 ? day : '0' + day;
    
//     return month + '/' + day + '/' + year;
//   }