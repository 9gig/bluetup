const crypto = require("crypto");
const adminService  = require("../services/adminService");
const cloudinary =require("../utils/cloudinary");
const bcryptjs  = require("bcryptjs");

exports.addNewDeal = async (req,res,next)=>{
    try {
        const urls = [];
        const idz = [];
  const files = req.files;
  for (const file of files) {
    const { path } = file;
    // console.log(path);
 const newPath = await cloudinary.cloudinaryImageUploadMethod(path);
    urls.push(newPath);
  
    idz.push(newPath);
  }
  var invModel ={
    name:req.body.name,
    totalUnit:req.body.totalUnit,
    cost:req.body.cost,
    returns:req.body.returns,
    invType:req.body.type,
    duration:req.body.duration,
    invSector:req.body.sector,
    location:req.body.location,
    insurancePatner:req.body.patner,
    payoutType:req.body.payout,
    unitType:req.body.unitType,
    video:req.body.video,
      assets:urls.map( url => url.res ),
    cloudinary_id: idz.map( id => id.rid ),
  }
//   console.log(invModel);

        adminService.addDeal(invModel, (error, result)=>{
            if(error){
                return next(error);
            }else{
                return res.status(200).send({
                    message: "success",
                    data: result,
                });
            }
        });
        
    } catch (error) {
        console.log(error);
    }
}

//Add savings
exports.addSavings =(req, res, next)=>{
  try {
    const {name,transactions,balance,intrestRate}= req.body;
    adminService.addSavings(req.body, (error, result)=>{
      if(error){
        return next(error);
    }else{
        return res.status(200).send({
            message: "success",
            data: result,
        });
    }
    })


  } catch (error) {
    console.log(error);
  }
}


// Ctrl for all User data
exports.getUsers = (req, res, next) =>{
  try{
adminService.getAllUsers((error, results)=>{
  if(error){
    return next(error);
  }else{
    return res.status(200).send({
      message:"success",
      data: results,
    })
  }
});


  }catch(error){
    console.log(error);
  }
}


//CTRL for Deals
exports.getDeals = (req, res, next)=>{
  try{
    adminService.getAllDeals((error, results)=>{
      if(error){
        return next(error);
      }else{
        return res.status(200).send({
          message:"success",
          data: results,
        })
      }
    });
    
      }catch(error){
        console.log(error);
      }
}

//CTRL Get Investment
exports.getInvestments = (req, res, next)=>{
  try{
    adminService.getAllInvestments((error, results)=>{
      if(error){
        return next(error);
      }else{
        return res.status(200).send({
          message:"success",
          data: results,
        })
      }
    });
      }catch(error){
        console.log(error);
      }
}

// Get All Saving profile
exports.getSavings = (req, res, next)=>{
  try{
    adminService.getAllSavings((error, results)=>{
      if(error){
        return next(error);
      }else{
        return res.status(200).send({
          message:"success",
          data: results,
        })
      }
    });
      }catch(error){
        console.log(error);
      }
}


//Password for admin
exports.pass =(req, res,next)=>{
  try {
    const {logging} = req.body;
    const {password} = req.body;
    const salt = bcryptjs.genSaltSync(10);

    req.body.password = bcryptjs.hashSync(password, salt);
    var model = {
      logger:logging,
      password:req.body.password
    }
adminService.setPass(model, (error,results)=>{
  if(error){
    return next(error);
  }else{
    return res.status(200).send({
      message:"success",
      data: results,
    })
  }
});

  } catch (error) {
    console.log(error);
  }
}

exports.login = (req,res,next)=>{
  try{
    const {logging, password} = req.body;
    adminService.login({logging,password}, (error, result) =>{
        if(error){return next(error);}
        return res.status(200).send({
            message:"success",
            data: result,
        });
    });
  }catch(error){
    console.log(error);
  }
}