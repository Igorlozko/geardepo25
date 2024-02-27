import {Router} from 'express'
import express from 'express';
import auth from '../middleware/auth.js';
import {createReservation} from '../controllers/reservation.js'
import { createPaymentIntent } from '../controllers/payment.js';
import Stripe from 'stripe';



const reservationRouter = express.Router();

reservationRouter.post('/', auth, createReservation);
reservationRouter.post('/create-payment-intent', createPaymentIntent,); // Define the route for creating payment intent

export default reservationRouter; 
