const savingService = require('../services/savingsService');
exports.addSavings =(req, res, next)=>{
  try {
   
    const userId = req.body.userId;
    const method = req.body.paymentMethod;
    const amount = req.body.amount;
    
    model = {
      amt:req.body.amount,
      type:req.body.type,
      id:req.body.id
    }
    if(method == 'wallet'){
      //subtract from wallet
      Genservice.deduct({userId:req.body.userId, bal:amount}, (error, result)=>{
          if(!error){
             return savingService.addSavings(userId, model, (error, result)=>{
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
 
    savingService.addSavings(userId, model, (error, result)=>{
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



exports.getSavingsProfile = (req, res, next)=>{
  try {
    const userId = req.params.id;


    savingService.getUserSavingsProfile(userId, (error, result)=>{
      if(!error){
          return res.status(200).json({
              message: "success",
              result
          });

      }
      return next(error);
     
  });
  } catch (error) {
    console.log(error);
  }
}