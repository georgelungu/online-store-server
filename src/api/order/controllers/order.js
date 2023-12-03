'use strict';

// left at 02:54:56
// possible error when importing stripe like that
// stripe is installed only in server.

// const token = import.meta.env.VITE_APP_API_TOKEN;
const stripe = require('stripe')(process.env.STRIPE_KEY);


/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order');
