const chally = require("../services/chalMMMService");


exports.joiner = (req,res,next)=>{
    try {
        const iDuser = req.body.userId;
        const amount = req.body.amount;
        const method = req.body.paymentMethod;
        const autoSave = req.body.autoSave;

       var model = {
            amt: amount,
            autoSave:autoSave
        }

        if(method == 'wallet'){
            //subtract from wallet
            Genservice.deduct({userId:req.body.userId, bal:amount}, (error, result)=>{
                if(!error){
                   return chally.joinORadd(iDuser, model, (error, result)=>{
                        if(!error){
                            return res.status(200).json({
                                message: "success",
                                data: result,
                            });
                
                        }
                        return next(error);
                       
                    });
        
                }
                return next(error);
               
            });
            // update transactions
        }else{
       
            return chally.joinORadd(iDuser, model, (error, result)=>{
                if(!error){
                    return res.status(200).json({
                        message: "success",
                        data: result,
                    });
            }
            return next(error);
           
        });
       }
        
    } catch (error) {
        console.log(error);
    }
}

exports.getUserChallenge = (req,res,next)=>{
    try {
        const iDuser = req.body.userId;
        
        chally.getChallengeDetails(iDuser,(error,result)=>{
            if(!error){
                return res.status(200).json({
                    message: "success",
                    data: result,
                });
        }
        return next(error);
        });
    } catch (error) {
        console.log(error);
    }
}