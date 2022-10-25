const investService = require("../services/investingService");
const Genservice    = require("../services/genServices");

//Get total investment balance
exports.totalBal = async(req,res,next)=>{
    try{
        const userId =req.params.id;
        investService.getTotalBal(userId, (error,result)=>{
            if(!error){
                return res.status(200).json({
                    message: "success",
                    data: result
                });
            }
            return next(error);
        });
    }catch (error){
        console.log(error);
    }
}
// add investment by wallet/card
exports.invest = async(req,res,next)=>{
    
    try {
        const userId = req.body.userId;
        const method = req.body.paymentMethod;
        const dur = req.body.dur;
        const returns = req.body.returns;
        const cap = req.body.capital;

        function percentCalculation(a, b){
            var c = (parseFloat(a)*parseFloat(b))/100;
            return parseFloat(c);
          }
         
        //calc no of days
        var days = 30* parseInt(dur);
        //calc total interest
          var tInt = percentCalculation(cap, returns);
        //calc daily interest
        var ddInt = tInt/days;
        //interval of withdrawals
        var date = new Date();
        var last = new Date(date.getTime() + (days* 24 * 60 * 60 * 1000));


        var model ={
            invDetails:req.body.invDetails,
                capital:req.body.capital,
                unitsHeld:req.body.units,
                bal:req.body.bal,
                dInt: ddInt,
                durationMonths: req.body.dur,
                uppieDated: new Date(),
                startDate:new Date(),
                endDate:last,
                interval:req.body.interval
        }
        if(method == 'wallet'){
            //subtract from wallet
            Genservice.deduct({userId:req.body.userId, bal:req.body.capital}, (error, result)=>{
                if(!error){
                   return investService.invest(userId, model, (error, result)=>{
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
       
        investService.invest(userId, model, (error, result)=>{
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

//get all investments by user
exports.getMyInvestments = async(req,res,next)=>{
    try {
        const myId = req.params.id;
        investService.getInvestmentsByUser(myId,(error, result)=>{
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


//Get Deals
exports.getDeals = async(req,res,next)=>{
    try {
        investService.deals((error, result)=>{
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




//withdraw all profits


