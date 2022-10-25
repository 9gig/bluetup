const User  = require("../models/User_model");
const Investments    = require("../models/invest.model");
const Deals     = require("../models/deals.model");
const auth  = require("../middlewares/🔐");


// Add investment
async function invest(userId,params,callback){

    //check if investment is still available
    const deal = await Deals.findById(params?.invDetails);
    if(deal == null){
         return callback({
                message:"Offer is unavailable"
        });
    }

    //check if user has this investment
    const dealID = params?.invDetails;
    const singleton = await Investments.findOne({userId:userId,invDetails:dealID});
  
    if(singleton == null) {
         var nextDates = [];
           //calc no of days
        var days = 30* parseInt(params.durationMonths);
         var  interval = params.interval == "weekly"? 7 : params.interval == "monthly"?30 : days;

         for (let index = 0; index <= days; index+= interval) {
            var date = new Date();
            var nextW = new Date(date.getTime() + ( index* 24 * 60 * 60 * 1000));
            nextDates.push(nextW);
         }
         const newInvest = new Investments({
            userId:userId,
            invDetails:params.invDetails,
            capital:params.capital,
            unitsHeld:params.unitsHeld,
            bal:params.bal,
            durationMonths: params.durationMonths,
            profit:0,
            uppieDated:params.uppieDated,
            dInt:params.dInt,
            interval:params.interval,
            startDate:params.startDate,
            endDate:params.endDate,
            nextWithdrawal:nextDates
        });
        // just save new user with the investment
        await newInvest.save().then((response)=>{
            return callback(null, response);
        }).catch((error)=>{
            return callback(error);
        });
    }else{
    const inv = await Investments.findById(singleton._id);
    var cap = parseInt(inv.capital);
    var nwCap = parseInt(params.capital);
    var am = parseInt(inv.bal);
    var nwAm = parseInt(params.bal);
    var initUnit = parseInt(inv.unitsHeld);
    var newUnit = parseInt(params.unitsHeld);
    var inty = parseInt(inv.dInt);
    var newInty = parseInt(params.dInt);
    var finalCap = cap+nwCap;
    var finalBal = am+nwAm;
    var finalUnits = initUnit+newUnit;
    var finalInty = inty+newInty;
  
    var user = singleton._id;

    Investments.updateOne({_id:user}, {capital:finalCap, bal:finalBal, unitsHeld:finalUnits, dInt: finalInty }, {new: true}).then((response) =>{
       
        return callback(null, response);
    }).catch((error)=>{
        return callback(error);
    });
}

        
}




//Get investmets of user
async function getInvestmentsByUser(params,callback){
    const user = await Investments.find({userId: params}).populate("invDetails");
    if(user == null){
        return callback({
            message:"No investment found"
        });
    }

    // console.log(user[1].invDetails.location);
    
    // Seperate all active from Matured
    var active = [];
    var matured = [];
    // var tod = new Date();
    for (const m of user) {
        var cheeko =  checkDateDiff(m.nextWithdrawal[1]);
        if(cheeko < 1){
            matured.push(m);
        }else{
            active.push(m);
        }
    }
   
     return callback(null, {
        active,
        matured
    });
 
}




//Get total bal of user investments
async function getTotalBal(params, callback){
    const userInv = await Investments.find({userId:params});
    if(userInv == null){
        return callback({
            message:"empty"
        });
    }
    var bali = [];
    var talpi = [];
    for (let i = 0; i < userInv.length; i++) {
         // get date diff
         var tdy = new Date();
         var lastD = new Date(userInv[i].uppieDated);
         var diffTime = tdy.getTime() - lastD.getTime();
         var diff = Math.floor(diffTime / (1000*3600*24));
    //if diff is less than one day return bal
    //if diff >= one day dint * diff
        var dInt = parseInt(userInv[i].dInt);
        var totalP = diff < 1 ?0 :diff * dInt;
        var invBal  = totalP + parseInt(userInv[i].bal);
        var newProfit = totalP+ parseInt(userInv[i].profit);
        bali.push(invBal);
        talpi.push(newProfit);

    await Investments.findByIdAndUpdate({_id:userInv[i]._id}, {bal:invBal, uppieDated:new Date(), profit:newProfit}, {new: true});
   
    
    // console.log({"Total Profit":totalP});
    // console.log({"No of Days":diff});
    // console.log({"Daily Int":dInt});
    // console.log({"invBalance": invBal});
    // console.log({"prevBalance": userInv[i].bal});


    //totalprofit = add all profit
    //newbal = bal+totalprofit
    // updateDb
    //push newbal to bali[]
    //calc sum
    //push profit to profiti[]
    //calc sum
    //return sumBal and sumprofit
        
    }
   
    const totalBalance = bali.reduce((a, b) => a + b, 0).toString();
    const totalProfit = talpi.reduce((a, b) => a + b, 0).toString();

   return callback(null, {title:"Investment",bal:totalBalance, profit:totalProfit});

   




    
//    for (const i of userInv) {
//     bali.push(parseInt(i.amount));
//    }
//    const totalsum = bali.reduce((a, b) => a + b, 0).toString();
//    return callback(null, {title:"Investment",bal:totalsum});

}






//withdraw to bank
async function withdrawToBank(params, callback){

}

//withdraw to wallet
async function withdrawToWallet(params, callback){

}





//GEt all Deals
async function deals(callback){
    const deals = await Deals.find({});
    if(deals == null){
        return callback({
            message:"No Deals found"
        });
    }
    return callback(null, deals);
}


// COMMON FUNCTIONS
// COMMON FUNCTIONS
// COMMON FUNCTIONS
// COMMON FUNCTIONS
// COMMON FUNCTIONS
// COMMON FUNCTIONS
function checkDateDiff(dd){
    var tdy = new Date();
    var nxtD = new Date(dd);
    var diffTime =  nxtD.getTime()-tdy.getTime();
    var diff = Math.floor(diffTime / (1000*3600*24));

    return diff;
}









module.exports ={
    invest,
    getInvestmentsByUser,
    deals,
    getTotalBal
}













// //Get total bal of user investments
// async function getTotalBal(params, callback){
//     const userInv = await Investments.find({userId:params});
//     if(userInv == null){
//         return callback({
//             message:"empty"
//         });
//     }
//     var bali = [];
//    for (const i of userInv) {
//     bali.push(parseInt(i.amount));
//    }
//    const totalsum = bali.reduce((a, b) => a + b, 0).toString();
//    return callback(null, {title:"Investment",bal:totalsum});

// }




// var days = 30; // Days you want to subtract
//     var date = new Date();
//     var last = new Date(date.getTime() + (1 * days* 24 * 60 * 60 * 1000));
//     var day =last.getDate();
//     var month=last.getMonth();
//     var year=last.getFullYear();
 
//     console.log(last);