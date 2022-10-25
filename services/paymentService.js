// const User  = require("../models/User_model");
// const {Transaction, Card} = require("paystack-js");

// async function payment({ requestData,card}, callback) {
  
//       // Request a new transaction
//       const transaction = await Transaction.request(requestData); 
       
//       // Create a payment method instance that will be used e.g card
     
       
//       // Payment method instances provide validation functions that
//       // you can use to check for validaty before setting payment method
//       if (card.isValid()) {
//         try {
//           transaction.setPaymentMethod('card', card);
//         } catch(e) {
//           console.log(e);
//         }
//       }
       
//       // Charge the payment method
//       const chargeResponse = await transaction.chargeCard();
       
//       // Handle the charge response
//       if (chargeResponse.status === 'success') {
//         alert('Payment completed!');
//       }
// }


// module.exports = {
//     payment
// }