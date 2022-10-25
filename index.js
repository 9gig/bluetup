const express   = require("express");
const mongoose   = require("mongoose");
const {unless}    = require("express-unless");
const cors      = require("cors");
const dotEnv    = require("dotenv");
const bodyParser = require('body-parser');
const dbconfig  = require('./config/db.config');
const twilConfig = require('./config/bluetuptwilio');
const client    = require('twilio')(twilConfig.accountSID, twilConfig.authToken);
const crypto = require("crypto");
const wa = require('./models/User_model');
const imageupload = require('express-fileupload');




//Initilization
const app       = express();
// app.use(imageupload());
dotEnv.config();
app.use(cors({origin:"*"})); //Using cors for multiple access

//Database configuration
mongoose.Promise = global.Promise;
mongoose.connect(dbconfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
  }).then(() => {
    console.log("Connection successfull...Lets roll😊");
  },
    (error) => {
        console.log('An Error occured: '+ error );
    } 
  );




//Body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

//Retriving the midleware
const auth          = require('./middlewares/🔐');
const errors        = require('./middlewares/🦺');

//Routes to Use before token

app.get("/", (req, res)=>{
    res.send(`<h1>Hello Bluetup</h1>`);
});

// OTP Route
app.post('/getOtp', (req,res)=>{
  const phone = req.body.phone;
  
  client.verify.services(twilConfig.serviceID).verifications.create({to:phone,channel:"sms"}).then((verification)=>{
res.status(200).send({
  message: "success",
  data: verification

  
})
  }).catch(error =>{
    console.log(error)
  })
});

app.get('/verifyCode/:phone/:code', (req, res)=>{
  const phone = req.params.phone;
  const code = req.params.code;
 
  client.verify.services(twilConfig.serviceID)
  .verificationChecks
  .create({to: phone, code: code})
  .then(verification_check => res.send({status:verification_check.status})).catch(error => res.send(error));
})
app.get('/rad', (req, res)=>{
  const id = crypto.randomBytes(4).toString("hex");
  const intials = "BTI-"
    
  res.send(intials+id);
});
app.get('/getWallet/:id', async (req, res)=>{
  const id=req.params;
  const wallet = await wa.findById(id);
  res.send(wallet);
});
//init referral system
app.use("/ref", require("./routes/refer.routes"));
// init admin Route
app.use("/admin", require("./routes/admin.routes"));



//Token Bypass endpoints
express.static.unless = unless;
auth.authenticateToken.unless = unless;
app.use(auth.authenticateToken.unless({
    path:[
        {url:"/user/register", method:["POST"]},
        {url:"/user/login", method:["POST"]},
        {url:"/getOtp", method:["POST"]},
        {url:"/verifyCode/:phone/:code", method:["Get"]},
        {url:"/user/radTest", method:["Get"]},
        {url:"/ref/addRef", method:["POST"]},
        {url:"/ref/createRef", method:["POSt"]},
        {url:"/ref/createRef", method:["POSt"]},
        

    ]
}))




//Routes to Use after token
app.use("/user", require("./routes/user.routes"));

//init investing route
app.use("/investment", require("./routes/investment.routes"));

//init Saving route
app.use("/savings", require("./routes/savings.routes"));

//init Challenge route
app.use("/chally", require("./routes/challenge.routes"));
//init General wallet route
app.use("/gen", require("./routes/gen.routes"));



// app.use("/payment", require("./routes/payment.routes"));
app.use(errors.errorHandler);


//Server Usage
app.listen(process.env.PORT || 4040);