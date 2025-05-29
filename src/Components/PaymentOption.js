import React from 'react'
import { Typography, Button, TextField, Grid, Checkbox } from '@mui/material';
import IconButton from '@mui/material/IconButton';


function PaymentOption({ donationAmount, setDonationAmount, handleDonate, coverCosts, setCoverCosts, MpesaOption, setMpesaOption, paypalOption, setpaypalOption }) {
  const MpesaHandle = () => {
    // Handle donation logic here
    setMpesaOption(!MpesaOption);
  };
  
  const PaypalHandle = () => {
    // Handle donation logic here
    setpaypalOption(!paypalOption);
  };
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '-30px', marginLeft: '-30px' }}>
    <IconButton
                onClick={handleDonate}
              >
                <i className='fa fa-backward' style={{ fontSize: '40px'}}></i>
    </IconButton>
    </div>
    <Typography variant="h2" gutterBottom id="modal-title">
      Payment option
    </Typography>
    <Grid container spacing={2} alignItems="center" justify="center">
      <Grid item xs={8}>
        <TextField
          label="Enter Donation Amount"
          variant="outlined"
          fullWidth
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        />
      </Grid>
    </Grid>
    <Typography variant="body2" gutterBottom>
      <Checkbox checked={coverCosts} onChange={(e) => setCoverCosts(e.target.checked)} />
      Would you like to cover the transaction costs so that we receive 100% of your gift?
    </Typography>
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <Button variant="contained" 
              style={{ width: '70%', 
              marginLeft: '10px' }} onClick={PaypalHandle}>
        Paypal
      </Button>
      <Button
        variant="contained"
        style={{ width: '70%', marginLeft: '10px' }}
        onClick={MpesaHandle}
        disabled // Button disabled by default
        title="UNDER MAINTENANCE" // Tooltip text to show on hover
      >
        Mpesa
      </Button>
    </div>
  </>
  )
}

export default PaymentOption