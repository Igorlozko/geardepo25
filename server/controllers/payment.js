import Stripe from 'stripe';
/**It seems that the formattedPaymentMethod object is indeed being received correctly in the backend. 
 * However, the issue lies in the fact that the PaymentIntent is being created without a 
 * payment method attached to it, which is why Stripe is throwing the error "You cannot confirm this 
 * PaymentIntent because it's missing a payment method." */

const stripe = new Stripe('sk_test_51OmyAkFrMLefLTJ5GRSmUK0gdh5GLRelIYQtp7KqT59iWMShb5icYfzB2k283yshM8Jscltq2BF7HBJyAZEguTRD00nJZjTsBS');

export const createPaymentIntent = async (req, res) => {
    try {
        const { amount, paymentMethod } = req.body; // Accept paymentMethod from the request body
        
        console.log('Request body:', req.body); 
        // Create the payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur', // Change the currency based on your requirements
            payment_method: paymentMethod.id, // Pass the payment method to Stripe
            confirm: true, // Confirm the payment intent immediately
            return_url: 'https://localhost3000/checkout/success',
        });
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
        console.log('Payment intent ',paymentIntent )
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ success: false, message: 'Failed to create payment intent.' });
    }
};
