const User  = require("../models/User_model");
const Mchallenge = require("../models/challenge.model");



//Join or addTo challenge
async function joinORadd(userId,params,callback){
    const userID = userId;
    const user = await User.findOne({uID:userID});
    if(user != null){
        const dashie = await Mchallenge.M_challenge.findOne({userId:userID});
        if(dashie == null){

            var model ={
                userId:userID ,
    balance: params.amt,
    startAmt:0,
    target:250000,
    slot:0,
    startDate:Date(),
   
            }

            const chal = new Mchallenge.M_challenge(model);
        chal.save().then((rez)=>{
            return callback(null, rez);
        })

        } 
        if(dashie != null){
            var bal = dashie.balance;
            var sloty = dashie.slot;
            var adder = Math.floor(parseInt(bal)/250000);

            var newBal = parseInt(bal) + parseInt(params.amt);
            var sloth = parseInt(sloty)+adder;

            Mchallenge.M_challenge.updateOne({_id:dashie._id}, {balance:newBal, slot:sloth}, {new: true}).then((rez)=> {
                return callback(null, rez);
            });
           
        }
    }else{
        return callback({
            message:"User not Found"
        });
    }
}

//get user challenge
async function getChallengeDetails(userId,callback){
    const userID = userId;
    const user = await User.findOne({uID:userID});
    if(user != null){
        const dashie = await Mchallenge.M_challenge.findOne({userId:userID});
        if(dashie == null){
            return callback(null, false);
        }else{
            let bal = parseInt(dashie.balance);
            let strAmt = parseInt(dashie.startAmt);
            let sloty = parseInt(dashie.slot);
            let tarG = parseInt(dashie.target);

        
            
            if(bal >= tarG){
                var diff = Math.floor(bal/tarG);
                var newStartAmt = tarG*diff;
                var hDiff = diff+1;
                var targie = tarG*hDiff;
                var newSloty =Math.floor (bal/250000);

              Mchallenge.M_challenge.updateOne({_id:dashie._id}, {startAmt:newStartAmt,target:targie, slot:newSloty}, {new: false}).then((response)=>{
               var rezzy=  Mchallenge.M_challenge.findOne({_id:dashie._id});
                return callback(null, rezzy);
              });
              } else{
                return callback(null, dashie);
              }
          
            
        }

      


    }else{
        return callback({
            message:"User not Found"
        });
    }

}


module.exports = {joinORadd, getChallengeDetails};