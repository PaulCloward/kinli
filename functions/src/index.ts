
const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase);

const stripe = require('stripe')(functions.config().stripe.testkey)

exports.stripeCharge = functions.database
                                .ref('/payments/{userId}/{paymentId}')
                                .onWrite(event => {

  const payment = event.after.val();
  const userId = event.params.userId;
  const paymentId = event.params.paymentId;

  let balance = 0;


  // checks if payment exists or if it has already been charged
  if (!payment || payment.charge) return;

  return admin.database()
        .ref(`/users/${userId}`)
        .once('value')
        .then(snapshot => {
            return snapshot.val();
         })
         .then(customer => {

           balance = customer.balance

           const amount = payment.amount;
           const idempotency_key = paymentId;  // prevent duplicate charges
           const source = payment.token.id;
           const currency = 'usd';
           const charge = {amount, currency, source};


           return stripe.charges.create(charge, { idempotency_key });

         })

         .then(charge => {

            if (!charge) return;

            let updates = {}
            updates[`/payments/${userId}/${paymentId}/charge`] = charge

            // If successful charge, increase user balance
            if (charge.paid) {
              balance += charge.amount
              updates[`/users/${userId}/balance`] = balance
            }

           // Run atomic update
            admin.database().ref().update(updates)
          })

});