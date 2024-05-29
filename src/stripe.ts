import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe('your-publishable-key-here');