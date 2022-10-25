const User  = require("../models/User_model");
const auth  = require("../middlewares/🔐");
const bcrypt = require("bcryptjs");
const { head } = require("../routes/user.routes");
const Hashee      = require("../models/hashTest");
const crypto = require("crypto");


// Set encryption params
//enc algo
const algorithm ="aes-256-cbc";
//enc key
const key = "blue-Tup.Be,etles-encoded-by9g!g";
//initialization vector
const iv = crypto.randomBytes(16);
// const iv2 = crypto.randomBytes(16);

async function dcrypt(params, callback){
    if(params === undefined){
        return callback({message:"Invalid id"});
    }
    const obj = await Hashee.findOne({"_id":params});
   
    if(obj == null){
        res.status(401).send("not found");
        return;
    }
    // console.log(obj.iv);

     //convert init vector from base64 to buffer
     const org = Buffer.from(obj.iv,"base64");
    //  console.log(org);

    //  //dicrypt using secret
     const decipher = crypto.createDecipheriv(algorithm,key,org);
     let dicrypted = decipher.update(obj,"hex", "utf-8");
     dicrypted += decipher.final('utf8');
    //  const nxdecipher = crypto.createDecipheriv(algorithm,key,org);
    //  let nxdicrypted = nxdecipher.update(obj.walletEnc,"hex", "utf-8");
    //  nxdicrypted += nxdecipher.final('utf8');
     console.log(dicrypted);



    // const user = new User(params);
    // user.save().then((response)=>{
    //     return callback(null, response);
    // }).catch((error)=>{
    //     return callback(error);
    // });
}

module.exports = {
   dcrypt
}