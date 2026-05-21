import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { AIResearchEngine } from './ai/productResearch';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2023-10-16' });

admin.initializeApp();
const db = admin.firestore();

export const researchProduct = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be logged in');
  }
  // Always get the userId from the auth context on the backend for security.
  // Never trust the userId sent from the client.
  const { query } = data;
  const userId = context.auth.uid;

  try {
    const researchEngine = AIResearchEngine.getInstance();
    const results = await researchEngine.researchProduct(query);
    const sourcingRequest = {
      userId,
      productName: results.productName,
      aiAnalysis: results,
      status: 'pending',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await db.collection('sourcing_requests').add(sourcingRequest);
    return { success: true, requestId: docRef.id, results };
  } catch (error) {
    console.error('Research error:', error);
    throw new functions.https.HttpsError('internal', 'Research failed');
  }
});

export const autoSourcingJob = functions.pubsub
  .schedule('every 6 hours')
  .onRun(async () => {
    // Implement trending product search
    return null;
  });

export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !endpointSecret) {
    res.status(400).send('Webhook Secret or Signature missing');
    return;
  }

  try {
    const event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      // Execute order fulfillment logic here
      console.log(`Payment successful for order reference: ${session.client_reference_id}`);
    }

    res.json({ received: true });
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});