import React, { useState } from 'react';
import { Alert } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import Loader from './Loader';
import emailjs from '@emailjs/browser';

function Paypal({ donationAmount, transactionAmount, paypalOption, setpaypalOption }) {
  const parsedTransactionAmount = isNaN(parseFloat(transactionAmount)) ? 0 : parseFloat(transactionAmount);
  const parsedDonationAmount = isNaN(parseFloat(donationAmount)) ? 0 : parseFloat(donationAmount);
  const [{ isPending }] = usePayPalScriptReducer();
  const [success, setSuccess] = useState(null);
  

  const total = parsedTransactionAmount + parsedDonationAmount;

  const handleApproval = (data, actions) => {
    // Capture the funds after payment approval
    actions.order.capture().then((details) => {
      // Handle the successful payment here
      
      const purchaseUnit = details.purchase_units[0];
      const shipping = purchaseUnit.shipping;

      var templateParams = {
        merchantid: purchaseUnit.payee.merchant_id,
        amount: purchaseUnit.amount.value,
        email_address: purchaseUnit.payee.email_address,
        full_name: shipping.name.full_name,
        admin_area_2: shipping.address.admin_area_2,
        country_code: shipping.address.country_code,
        id: details.id,
      };
      setSuccess("Thank you for your Donation");
      emailjs.send('service_2i4mgse', 'template_ba2lgdq', templateParams, {
        publicKey: 'XVhsNAmGiLqyB9LJ8'}).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );

    }).catch((err) => {
      console.error('Error capturing payment:', err);
      // Handle the error here
    });
  };

  const handleError = (err) => {
    console.error('PayPal payment error:', err);
    // Handle the error here
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: '-30px',
          marginLeft: '-30px',
        }}
      >
        <IconButton onClick={() => setpaypalOption(!paypalOption)}>
         <i className='fa fa-backward' style={{ fontSize: '40px'}}></i>
        </IconButton>
      </div>
      <div style={{ height: '25vh'}}> {success && <Alert severity="success">{success}!</Alert>}</div>
      <div
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px', // Add margin bottom to separate from the button
        }}>
      <PayPalButtons
        style={{ layout: 'horizontal' }}
        createOrder={(data, actions) => {
          return actions.order.create({
            "intent": "CAPTURE",
            "purchase_units": [
              {
                "reference_id": "default",
                "amount": {
                  "currency_code": "USD",
                  "value": total
                }
              }
            ]
          });
        }}
        onApprove={handleApproval}
        onError={handleError}
      />
      {isPending && <Loader />}
      </div>
    </div>
  );
}

function PaypalWrapper(props) {
  return (
    <PayPalScriptProvider
      options={{
        'client-id': 'ARv92c-YDkuV302fTIhcXrQ-fzkd3pajUfJqNsSQ_DrPP3QK1HjFvWr_LGXDgiU0deEuB82sWb1JHvBd',
        currency: 'USD',
      }}
    >
      <Paypal {...props} />
    </PayPalScriptProvider>
  );
}

export default PaypalWrapper;
