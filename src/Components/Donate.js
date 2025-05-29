import React, { useState, useEffect  } from 'react';
import { Modal, Button, Box } from '@mui/material';
import SupportCause from './SupportCause';
import PaymentOption from './PaymentOption.js';
import Mpesa from './Mpesa.js';
import Paypal from './Paypal.js';


function Donate({ open, handleClose }) {
  const [donationAmount, setDonationAmount] = useState(null);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [paymentOption, setpaymentOption] = useState(false);
  const [coverCosts, setCoverCosts] = useState(false);
  const [MpesaOption, setMpesaOption] = useState(false);
  // const [creditCardOption, setcreditCardOption] = useState(false);
  const [paypalOption, setpaypalOption] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null);

  const support = [
    require('../Images/image1.png'),
    require('../Images/image2.jpeg'),
    require('../Images/image3.jpeg'),
    require('../Images/image4.jpeg')
  ];

  useEffect(() => {
    if (coverCosts) {
      // set the costs to be covered for transactions
      setTransactionAmount(20);
    }
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % support.length);
    }, 15000); // Change image every 15 seconds

    return () => clearInterval(imageInterval);
  }, [support.length, coverCosts]);

  const handleDonate = () => {
    // Handle donation logic here
    setError(null);
    if (donationAmount) {
      setpaymentOption(!paymentOption)
    }else{
      setError("Enter a value to proceed");
    }
    
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      BackdropClick={false}
    >
        <div onClick={handleClick} style={{ width: '100%', height: '100%' }}>
        <Button
            variant="contained"
            onClick={handleClose}
            style={{
                position: 'fixed',
                top: '5px',
                right: '5px',
                zIndex: 9999, // Ensure it's above other elements
                backgroundColor: 'transparent',
            }}
        >
            <i class="fa-regular fa-circle-xmark"></i>
        </Button>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
        }}
      >
        {/* First Box */}
        <Box
          className="background0"
          sx={{
            width: '600px',
            height: '550px',
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
            display: { xs: 'none', md: 'block' }
          }}
        >
          <center><h2 id="modal-title">Cloud Kids</h2></center>
          <div id="modal-description">
          <Box
              component="img"
              src={support[currentImageIndex]}
              alt="Image Description"
              sx={{ width: '100%', 
                    height: 'auto',
                    maxWidth: '450px',
                    transform: 'rotate(-5deg) translateX(10%) translateY(20%)' }}
            />
          </div>
        </Box>
        {/* Space between the two boxes */}
        <Box sx={{ xs: '0px', width: '20px' }} />
        <Box
          className="background0"
          sx={{
            width: '400px', // Adjust the width of the second box
            height: '550px', // Set the height of both boxes
            borderRadius: '12px',
            boxShadow: 24,
            p: 4,
            
          }}
        >
          <div id="modal-description">
            {paymentOption ? (
              <div>
                {MpesaOption ? (
                  // Code to execute if M-Pesa option is true
                  <Mpesa
                  donationAmount={donationAmount}
                  transactionAmount={transactionAmount}
                  MpesaOption={MpesaOption}
                  setMpesaOption={setMpesaOption}
                  />
                ) : paypalOption ? (
                  // Code to execute if PayPal option is true
                  <Paypal
                  donationAmount={donationAmount}
                  transactionAmount={transactionAmount}
                  paypalOption={paypalOption}
                  setpaypalOption={setpaypalOption}
                  />
                ) : (
                  <PaymentOption
                  donationAmount={donationAmount}
                  setDonationAmount={setDonationAmount}
                  handleDonate={handleDonate}
                  coverCosts={coverCosts}
                  setCoverCosts={setCoverCosts}
                  MpesaOption={MpesaOption}
                  paypalOption={paypalOption}
                  setMpesaOption={setMpesaOption}
                  setpaypalOption={setpaypalOption}
                  />
                )}
              </div>
            ) : (
                <SupportCause
                error={error}
                donationAmount={donationAmount}
                setDonationAmount={setDonationAmount}
                handleDonate={handleDonate}
                />
            )}
            </div>
        </Box>
      </Box>
      </div>
    </Modal>
  );
}

export default Donate;
