// const payService = require("../services/paymentService");
// const {Transaction, Card} = require("paystack-js");

// exports.deposit = (req, res, next)=>{
//     try {
//         const requestData = {
//             email: 'customer@email.com',
//             amount: 100, // amount in kobo
//             key: 'pk_live_5602a97c01ca5d32d229a418cad22e1b58715a90',
//           };

//           const card = new Card({ 
//             number: '4084084084084081', 
//             cvv: '408', 
//             month: '12', 
//             year: '20', 
//           });
           
//         payService.payment({requestData, card},(error,result) =>{
//             if(error){
//                 return next(error);
//             }
//             return res.status(200).send({
//                 message: "success",
//                 data: result,
//             });
//         });

//     } catch (error) {
//         console.log(error.message);
//     }
// }