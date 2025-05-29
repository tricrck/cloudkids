import React, { useState, useEffect  }  from 'react'
import { Typography, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';
import backwardIcon from '../Images/backward.svg';
import IconButton from '@mui/material/IconButton';

function Mpesa({ donationAmount, transactionAmount, setMpesaOption, MpesaOption }) {
    const total = transactionAmount + donationAmount;
    const [mpesaNumber, setmpesaNumber] = useState('');
    const consumerKey = "jyuP5nreLjOTug0M0ZNuHWk3mKWbwyIB";
    const secret = "qcybsGOZJCAtPhjF";

    // Concatenating the consumer key and secret with a colon
    const concatenated = consumerKey + ":" + secret;
    // Encoding the concatenated string to base64 using btoa() function
    const auth = btoa(concatenated);

    useEffect(() => {
        const fetchAuthToken = async () => {
          try {
            const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?', {
              params: {
                grant_type: 'client_credentials'
              },
              headers: {
                Authorization: 'Basic ' + auth
              }
            });
    
            console.log("Respose Data", response.data); // Logging the response body containing the token
          } catch (error) {
            if (error.response) {
              // Server responded with a status other than 200 range
              console.error('Error response:', error.response.data);
            } else if (error.request) {
              // Request was made but no response was received
              console.error('Error request:', error.request);
            } else {
              // Something else happened while setting up the request
              console.error('Error message:', error.message);
            }
          }
        };
    
        fetchAuthToken(); // Invoke the function to fetch the authorization token
    }, [auth]); // Dependency array to run only once when the component mounts

    const handleMpesa = () => {
        // Handle donation logic here
        console.log("Number", mpesaNumber, "Total", total);
      };
 

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '-30px', marginLeft: '-30px' }}>
              <IconButton
                onClick={() => {
                  setMpesaOption(!MpesaOption);
                }}
              >
                <img
                  src={backwardIcon}
                  alt="Back"
                  style={{ width: '100%', height: 'auto', maxWidth: '60px' }}
                />
              </IconButton>
            </div>
    <Typography variant="h2" gutterBottom id="modal-title">
        Mpesa
      </Typography>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <TextField
          label="Donation Amount"
          variant="outlined"
          fullWidth
          value={donationAmount}
        />
      </Grid>
      <Grid item xs={8}>
        <TextField
          label="Mpesa Number"
          variant="outlined"
          fullWidth
          value={mpesaNumber}
          onChange={(e) => setmpesaNumber(e.target.value)}
        />
      </Grid>
      <Grid item xs={4}>
        <Button variant="contained" color="primary" onClick={handleMpesa}>
          Get stk Push
        </Button>
      </Grid>
    </Grid>
    <Typography variant="body2" gutterBottom>
      We are a non-profit organization, all donations are tax-deductible.
    </Typography>
  </>
  )
}

export default Mpesa