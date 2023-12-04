'use strict';

const Stripe = require('stripe');

const stripe = new Stripe.default(process.env.STRIPE_KEY);

// left at 02:57:58

// const token = import.meta.env.VITE_APP_API_TOKEN;
// const stripe = require('stripe')(process.env.STRIPE_KEY);

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(context) {
        const { email, products } = context.request.body
        try 
        {
            const session = stripe.checkout.create({
                mode: 'payment',
                success_url: `${process.env.CLIENT_URL}?success=true`,
                cancel_url: `${process.env.CLIENT_URL}/?success=false`,
            })
        } 
        catch (error) 
        {
            context.response.status = 500
            return error
        }
    }
}));
