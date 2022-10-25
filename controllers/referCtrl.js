const refed = require ("../services/referralService");

exports.create = (req,res,next)=>{
    try {
        const uu = req.body.userId;
        const link = req.body.link;
        const codex = req.body.code;

        var mod = {
            uID : uu,
            ref_link: link,
            code: codex
        }

        refed.create(mod, (error, result)=>{
            if(!error){
                return res.status(200).json({
                    message: "success",
                    data: result,
                });
            }
            return next(error);
        });
    } catch (error) {
        console.log(error)
    }
}


exports.add =(req,res,next)=>{
    try {
        const uu = req.body.userId;
        const refree = req.body.refree;

       var mod ={
        uID: uu,
        ref: refree
       }

       refed.add(mod,(error,result)=>{
        if(!error){
            return res.status(200).json({
                message: "success",
                data:result
            });
        }
        return next(error);
       });
    } catch (error) {
        console.log(error);
    }
}


exports.getRef = (req,res,next)=>{
    try {
        const uu = req.params.id;

        refed.getRef(uu, (error, result)=>{
            if(!error){
                return res.status(200).json({
                    message:"success",
                    data: result
                });
            }
            return next(error);
        });
    } catch (error) {
        console.log(error);
    }
}

