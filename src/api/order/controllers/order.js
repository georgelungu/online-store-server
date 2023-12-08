'use strict';

const Stripe = require('stripe');

const stripe = new Stripe.default(process.env.STRIPE_KEY);

// left at 03:00:00
// left at 03:09:30

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async create(context) {
        const { email, products } = context.request.body

        const lineItems = await Promise.all(
            products.map(async (product) => {
                const item = await strapi
                .service("api::product.product")
                .findOne(product.id)

                return{
                    price_data:{
                        currency: "usd",
                        product_data: {
                            name: product.title,
                        },
                        unit_amount: product.price * 100
                    },
                    quantity: product.quantity
                }
            })
        )

        try 
        {
            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                success_url: `${process.env.CLIENT_URL}?success=true`,
                cancel_url: `${process.env.CLIENT_URL}/?success=false`,
                line_items: lineItems,
                shipping_address_collection: {allowed_countries:["US", "CA"]},
                payment_method_types: ["card"], // don't know how to also add cash
            })

            await strapi.service("api::order.order").create({
                data:
                {
                    products, 
                    stripeId: session.id
                    // normally was stripeId: session.id
                }
            })

            return { stripeSession: session }
        } 
        catch (error) 
        {
            context.response.status = 500
            return error
        }
    }
}));
