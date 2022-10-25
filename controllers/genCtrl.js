const Genservice    = require("../services/genServices");


// addBalance
exports.addBalance = async(req, res,next)=>{
    try {
        const genModel = {
            title:"General",
            bal:req.body.bal,
            userId: req.body.userId
        }

        //Add data to transaction

        //call the add service
        Genservice.addBalance(genModel, (error, result)=>{
            if(!error){
                return res.status(200).json({
                    message: "success",
                    data: result
                });
            }
            return next(error);
        });
    } catch (error) {
        console.log(error);
    }
}


//Deduct
exports.deduct = async(req,res,next)=>{
    try{
        const genModel = {
            bal:req.body.bal,
            userId: req.body.userId
        }

        //udate transaction history data

        //Call deduction service
        Genservice.deduct(genModel, (error, result)=>{
            if(!error){
                return res.status(200).json({
                    message:"success",
                    data:result
                })
            }
            return next(error);
        });
    }catch (error){
        console.log(error)
    }
}

//Get total balance
exports.getBalance = async(req,res,next)=>{
    try{
        const userId = req.params.id;
        Genservice.getBalance(userId, (error, result)=>{
            if(!error){
                return res.status(200).json({
                    message:"success",
                    data: result
                })
            }
            return next(error);
        });

    }catch (error){
        return res.status(500).json({
            message:"Network Error"
        });
    }
}