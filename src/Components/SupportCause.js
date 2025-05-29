import React from 'react'
import { Typography, Button, TextField, Grid, Alert } from '@mui/material';

function SupportCause({ error, donationAmount, setDonationAmount, handleDonate }) {
  return (
    <>
    <Typography variant="h2" gutterBottom id="modal-title">
      Support Us
    </Typography>
    <Typography variant="body1" gutterBottom>
      Your contribution will help us continue our mission.
    </Typography>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <TextField
          label={error ? <Alert severity="error" sx={{ fontSize: '0.75rem', padding: '0px' }}>{error}</Alert> : "Enter Donation Amount"}
          variant="outlined"
          fullWidth
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" color="primary" onClick={handleDonate}>
          Donate
        </Button>
      </Grid>
    </Grid>
    <Typography variant="body2" gutterBottom>
      We are a non-profit organization, all donations are tax-deductible.
    </Typography>
  </>
  )
}

export default SupportCause