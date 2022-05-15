import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';

import Stripe from 'stripe';
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(express.json());
console.log('-----> ', process.env.STRIPE_SECRET_TEST);
const stripe = new Stripe(process.env.STRIPE_SECRET_TEST);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//app.use(express.urlencoded({ extended: true }));

app.post('/payment', cors(), async (req, res) => {
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'USD',
      description: 'Winner',
      payment_method: id,
      confirm: true,
    });
    console.log('Payment', payment);
    res.json({
      message: 'Payment successful',
      success: true,
    });
  } catch (error) {
    console.log('Error', error);
    res.json({
      message: error, //'Payment failed',
      success: false,
    });
  }
});

////////////////////////////////

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

/*app.post('/payment', (req, res) => {
  console.log(req.body);
});*/
app.use('/api/upload', uploadRouter);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
//const express = require('express');
/*const bodyParser = require('body-parser');
require('dotenv').config();
const Stripe = require('stripe')(process.env.SECRET_KEY);
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

*/
