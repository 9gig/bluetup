const userService = require("../services/user_Services");
const Hashee      = require("../models/hashTest");
const crypto = require("crypto");
const hashService = require("../services/hashny_services");

// Set encryption params
//enc algo
const algorithm ="aes-256-cbc";
//enc key
const key = "blue-Tup.Be,etles-encoded-by9g!g";
//initialization vector
const iv = crypto.randomBytes(16);
// const iv2 = crypto.randomBytes(16);

exports.toHash = (req, res, next)=>{
    //get data
    const {wallet,message} = req.body;
    // enc
    const cipher = crypto.createCipheriv(algorithm,key,iv);
    let walletEnc = cipher.update(req.body.wallet, "utf-8", "hex");
    walletEnc += cipher.final("hex");
    const newCipher = crypto.createCipheriv(algorithm,key,iv);
    let msgEnc = newCipher.update(req.body.message, "utf-8", "hex");
    msgEnc +=  newCipher.final("hex");

    // convert init vector to base64
    const base64data = Buffer.from(iv, "binary").toString("base64");

    // console.log(walletEnc);
    // console.log(msgEnc);
    // console.log(base64data);
    //save to DB
    var newEnc = new Hashee({
        wallet: walletEnc,
        message:msgEnc,
        iv:base64data
    });
  newEnc.save();
    res.json(newEnc);


}

exports.dicrypt = (req,res, next)=>{
    try {
        
        const id = req.params.id;
        //check if msg is dsame
       hashService.dcrypt(id,(error,result) =>{
            if(error){
                return next(error);
            }
            return res.status(200).send({
                message: "success",
                data: result,
            });
        });
       
    } catch (error) {
        res.json(error);
    }
}
