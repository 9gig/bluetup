const bcryptjs  = require("bcryptjs");
const userService = require("../services/user_Services");
const crypto = require("crypto");

exports.register = (req, res, next)=>{
    const {password} = req.body;
    const {phone} = req.body;
    const {firstName}= req.body;
    const {lastName} = req.body;
    const {email} = req.body;
    const id = crypto.randomBytes(4).toString("hex");
    const initials = "BTI-";
    const {uID} = initials+id;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);
    var model = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: req.body.password,
        uID: initials+id,
      
    }

    var plan = {
       
        balance:0.00,
        userId: initials+id,
        payDay:'',
        intrest:0.00,
        withdrawable:0.00
    }




    userService.register(model,plan,(error,result) =>{
        if(error){
            return next(error);
        }
        return res.status(200).send({
            message: "success",
            data: result,
        });
    });
}

exports.login = (req, res, next)=>{
    const {phone, password} = req.body;
    userService.login({phone,password}, (error, result) =>{
        if(error){return next(error);}
        return res.status(200).send({
            message:"success",
            data: result,
        });
    });
};


// exports.rad = (req, res, next)=>{
//     const id = crypto.randomBytes(16).toString("hex");
    
//     console.log(id);
// }

exports.updatePersonal = (req, res, next)=>{
    try {
        const {gender, dob,occupation} = req.body;
        userService.updatePersonal(req.body,(error,result) =>{
            if(error){
                return next(error);
            }
            return res.status(200).send({
                message: "success",
                data: result,
            });
        });

    } catch (error) {
        console.log(error.message);
    }
}

exports.addNextofKin = (req, res, next)=>{
    try {
        const {fullName,gender,email,phone,dob,relationship,address} = req.body;
        userService.addKin(req.body,(error,result) =>{
            if(error){
                return next(error);
            }
            return res.status(200).send({
                message: "success",
                data: result,
            });
        });
        
    } catch (error) {
        console.log(error.message);
    }
}
exports.updateBvn = (req, res, next)=>{}
exports.updateKyc = (req, res, next)=>{}
exports.updateBankDetails = (req, res, next)=>{}
exports.updateBankCard = (req, res, next)=>{}



