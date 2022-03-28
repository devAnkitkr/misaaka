import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

export default function CheckoutForm({ orderId }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(async ({ paymentIntent }) => {
        switch (paymentIntent.status) {
          case 'succeeded': {
            setMessage('Payment succeeded!');
            break;
          }
          case 'processing':
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.');
            break;
          default:
            setMessage('Something went wrong.');
            break;
        }
      });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.BASE_URL}/order/${orderId}/paid`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full bg-rose-400 rounded w-full text-white block py-3 flex justify-center hover:bg-rose-500"
      >
        <span id="button-text w-full">
          {isLoading ? (
            <button
              type="button"
              class="bg-rose-400 rounded w-full text-white block flex justify-center"
              disabled
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="animate-spin fill-white mr-3"
              >
                <circle cx="12" cy="20" r="2"></circle>
                <circle cx="12" cy="4" r="2"></circle>
                <circle cx="6.343" cy="17.657" r="2"></circle>
                <circle cx="17.657" cy="6.343" r="2"></circle>
                <circle cx="4" cy="12" r="2.001"></circle>
                <circle cx="20" cy="12" r="2"></circle>
                <circle cx="6.343" cy="6.344" r="2"></circle>
                <circle cx="17.657" cy="17.658" r="2"></circle>
              </svg>
              Processing...
            </button>
          ) : (
            'Pay now'
          )}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
