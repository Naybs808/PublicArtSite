import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./PaymentForm.js";

// PUBLIC KEY replaced for public facing repo
const stripeTestPromise = loadStripe("PUBLIC_KEY");

export default function StripContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
