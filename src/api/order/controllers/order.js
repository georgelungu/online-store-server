import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_KEY);

'use strict';

// left at 02:54:56

// const token = import.meta.env.VITE_APP_API_TOKEN;
// const stripe = require('stripe')(process.env.STRIPE_KEY);

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order');
