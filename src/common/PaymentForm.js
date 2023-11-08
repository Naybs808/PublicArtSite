/* eslint-disable no-use-before-define */
import React, { useState } from "react";

import { TextField, Button } from "@mui/material";

import { AddressElement,CardElement, useElements, useStripe} from "@stripe/react-stripe-js";
import axios from "axios";

import { useAppSelector } from "../hooks.tsx";
import { selectItems, selectProducts } from "../features/cartState/cartSlice.tsx";

import "./stripe.css"

// eslint-disable-next-line no-unused-vars
import {updateDoc, getDocs, doc, FieldValue} from "firebase/firestore"
import { useNavigate } from "react-router-dom";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883"},
      "::placeholder": { color: "#87bbfd"}
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }

}

export default function PaymentForm() {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  let navigate = useNavigate();
  let items = useAppSelector(selectItems);
  let products = useAppSelector(selectProducts);

  let lineItems = [];
  let totalCost = 0;
  for (let i = 0; i<products.length; ++i) {
    let numInCart = items.filter((it) => it === products[i].id).length
    if (numInCart > 0) {
      lineItems += products[i].id + "/"
      totalCost += products[i].price * numInCart
    }
  }

  let name = "";
  let city = "";
  let line1 = "";
  let line2 = "";
  let postCode = "";
  let country = ""

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect the user's email from the input field
    const email = document.getElementById('email').value;
    
    let addresss = elements?.getElement(AddressElement)
    await addresss.getValue()
    .then((response) => {
      console.log(response)
      name = response.value.name
      city = response.value.address.city
      line1 =  response.value.address.line1
      line2 = response.value.address.line2
      postCode = response.value.address.postal_code
      country = response.value.country
    })

    const { error, paymentMethod } = await stripe?.createPaymentMethod({
      type: "card",
      card: elements?.getElement(CardElement),
      billing_details: {
        email: email,
        name: name,
      },
    });

    console.log(name)
    if(!error) {
      try {
        const {id} =paymentMethod
        const response = await axios.post("hit the backend", {
          amount: totalCost*100,
          id: id,
          name: name,
          city: city,
          line1: line1,
          line2: line2,
          postCode: postCode,
          country: country,
          email: email,
          lineItems: lineItems,
        })
        if (response.data.success) {
          setSuccess(true)
          navigate("/success")
        }
      
  
      } catch (error) {
          console.log("errror", error)
          navigate("/cancel")
      }
    } else {
      console.log(error.message)
    }
  }
 

  return (<>
    {!success ? 

    <form onSubmit={handleSubmit}>
      <fieldset className="FormGroup">
        <div className="FormRow">
          <AddressElement options={{ mode: 'billing' }}/>
        </div>
        <div className="FormRow">
          <CardElement options={CARD_OPTIONS}></CardElement>
        </div>
      </fieldset>


      <TextField
        type="email"
        id="email"
        placeholder="Email"
        required
        sx={{width:"57ch", backgroundColor: "white", borderRadius: 2, marginLeft: "15px"}}
        style={CARD_OPTIONS.style.base}
        onChange={(event) => {setEmail(event.target.value)}}
      />
      <Button 
        variant="contained"
        sx={{width:"65ch", borderRadius: 2, marginLeft: "15px", marginTop: "15px"}}
        disabled={email ===""}
        className="stripeButton"
        onClick={(event)=>{handleSubmit(event)}}
      >
        Pay
      </Button>

    </form>
    :
    <div>
      <h2>You just bought a sweet painting.</h2>
    </div>  
  }
  
  </>);
}
