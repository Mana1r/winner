import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

const CardInputWrapper = styled.div`
  border: 2px solid #000;
  border-radius: 8px;
  padding: 20px 4px;
  white-space: nowrap;
  word-wrap:break-word;"
`;
const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#000',
      color: '#000',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#000' },
      '::placeholder': { color: '#000' },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log('----> payment methode :', paymentMethod);
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post('http://localhost:5000/payment', {
          amount: 1000,
          id,
        });

        if (response.data.success) {
          console.log('Successful payment');
          setSuccess(true);
        } else {
          console.log(response.data.message);
          setSuccess(false);
        }
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardInputWrapper>
                {' '}
                <CardElement options={CARD_OPTIONS} />
              </CardInputWrapper>
            </div>
          </fieldset>
          <button>Pay</button>
        </form>
      ) : (
        <div>
          <h2>
            You just bought a sweet spatula congrats this is the best decision
            of you're life
          </h2>
        </div>
      )}
    </>
  );
}
