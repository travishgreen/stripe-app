const express = require("express");
const app = express();
const { resolve } = require("path");
// This is a sample test API key. Sign in to see examples pre-filled with your key.
const stripe = require("stripe")("sk_test_udnSEBds1xP9dgmyHevTcyzQ00ob7V2Z48");

app.use(express.static("."));
app.use(express.json());

const winston = require('winston');
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 4000;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    // Verifies the integration works using the Stripe docs
    metadata: {integration_check: 'accept_a_payment'},
  });

  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

// Match the raw body to content type application/json
app.post("/webhook", async (req, res) => {
  let data, eventType;

    // we can retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;

  if (eventType === "payment_intent.succeeded") {
    // Funds have been captured
    // Fulfill any orders, e-mail receipts, etc
    // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    console.log("💰 Payment captured!");
    // Logs to combined.log all non-PCI details related to successful payments we'll need to fulfill
    logger.log({
      level: 'info',
      message: data
    });
    
  } else if (eventType === "payment_intent.payment_failed") {
    console.log("❌ Payment failed.");
  }
  res.sendStatus(200);
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));
