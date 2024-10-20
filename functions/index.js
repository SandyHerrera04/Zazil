const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const stripe = require('stripe')('sk_test_51QAcoXFxGNIrLyOAErZ13zuFKjSz2I07acT5IT6y4jwFey9oWozHfjpRu0wZHgIvqto5e3NY8nVAbHI5ChvXvq4000H36sLG3B');
const admin = require('firebase-admin');
const { user } = require('firebase-functions/v1/auth');
admin.initializeApp();

const db = admin.firestore();

exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
    const amount = data.amount;
    const currency = data.currency;

    try {
        // Crear el PaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: currency,
        });

        // Guardar la orden en Firestore después de crear el PaymentIntent
        const orderRef = db.collection('orders').doc(); // Genera un nuevo ID de orden
        await orderRef.set({
            id: orderRef.id,
            paymentMethod: 'Stripe',
            amount: amount,
            currency: currency,
            status: 'Pendiente',
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return { clientSecret: paymentIntent.client_secret };
    } catch (error) {
        throw new functions.https.HttpsError('unknown', error.message, error);
    }
});
