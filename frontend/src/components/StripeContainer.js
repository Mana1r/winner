import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY =
  'pk_test_51KxcbUBWPsYcNVXgJRajzpoQMH4b2Y0qvoXj8PSuEY3HhEc5VYPylhNs9nUwwsE2Y6TAWjbm8ODS6qEVAM00RHuw009Zjd5CAk';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
