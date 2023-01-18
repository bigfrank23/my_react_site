import React from 'react';
import { Typography, Button, Divider, Box } from "@mui/material";
import PaystackPop from "@paystack/inline-js";
// import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';
import axios from 'axios';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, nextStep, backStep, shippingData, onCaptureCheckout }) => {

  const handleSubmit = async (event) => {
    event.preventDefault();

    const paystack = new PaystackPop();

    paystack.newTransaction({
      key: "pk_test_991ef6cfc641dd4b948b2cac759d00d34d3ef116",
      amount: checkoutToken.live.subtotal.raw * 100,
      email: shippingData.email,
      onSuccess(transaction) {
        let message = `Payment Completed! Transaction reference ${transaction.reference}`;
        console.log(message);
        handleFormPayment()
        window.location.replace("/thanks_for_the_purchase");
      },
      onCancel() {
        console.log("Transaction Cancelled!");
      },
    });
    // console.log(paystack.id);

    const orderData = {
      // line_items: checkoutToken.live.line_items,
      // customer: {
        firstname: shippingData.firstName,
        lastname: shippingData.lastName,
        email: shippingData.email,
      // },
      // shipping: {
        name: "International",
        street: shippingData.address1,
        town_city: shippingData.city,
        county_state: shippingData.shippingSubdivision,
        postal_zip_code: shippingData.zip,
        country: shippingData.shippingCountry,
      // },
      // fulfillment: { shipping_method: shippingData.shippingOption },
      // payment: {
      //   gateway: "paystack",
      //   paystack: {
      //     reference: paystack.id, // The returned Paytack reference id
      //   },
      // },
    };
// console.log(orderData);
    const handleFormPayment = async() => {
      await axios
        .post("http://localhost:5000/checkout/", orderData, {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then((res) => {
          // alert("Email Sent Successfully");
          console.log('Email Sent Successfully')
          console.log(res);
          if (res.data.status === "success") {
            alert("Message Sent.");
          }
        })
        .catch((err) => {
          console.log(err);
        });

    }
  

    // onCaptureCheckout(checkoutToken.id, orderData);

    // nextStep();
    // }
  };

  return (
    <>
    <Box sx={{padding: '1rem 3rem'}}>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: '20px 0' }}>Payment method</Typography>
          <form onSubmit={(e) => handleSubmit(e)}>
            <br /> <br />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="outlined" onClick={backStep}>Back</Button>
              <Button type="submit" variant="contained" color="primary">
                Pay {checkoutToken.live.subtotal.formatted_with_symbol}
              </Button>
            </div>
          </form>
    </Box>
    </>
  );
};

export default PaymentForm;