import React, { useRef, useState } from 'react'
import { CircularProgress, Alert } from '@mui/material'
import ContactImage from '../Images/Contactus-Photoroom.png'
import emailjs from '@emailjs/browser';
import GetinTouch from '../Images/image-Photoroom.png'

function Contact() {
  const form = useRef();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  console.log(form.current)
  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    emailjs
      .sendForm('service_2i4mgse', 'template_is30vje', form.current, {
        publicKey: 'XVhsNAmGiLqyB9LJ8',
      })
      .then(
        () => {
          setLoading(false);
          setSuccess(true);
          // Clear the form
          form.current.reset();
          setTimeout(() => setSuccess(false), 5000);
        },
        (error) => {
          setLoading(false);
          setError(error.text);
        },
      );
  };
  return (
    <div className="contactcontainer">
      <div className="container-item">
      <div className="contact-form">
      <center><img src={GetinTouch} alt="Contact" className="img-fluid" /></center>
          {success && <Alert severity="success">Message sent successfully!</Alert>}
          {error && <Alert severity="error">Failed to send message: {error}</Alert>}
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" id="Name" name="Name" placeholder="Name" required />
          <input type="email" id="Email" name="Email" placeholder="Email" required />
          <textarea id="Message" name="Message" placeholder="How Can we Help you" rows="5" required />
          <center>
          {loading ? <CircularProgress size={24} /> : <button type="submit" disabled={loading}>Send Message</button>}
          </center>
        </form>
      </div>
      </div>
      <div className="container-item">
      <div className="image-container">
        <img src={ContactImage} alt="Contact" />
      </div>
      </div>
    </div>
  )
}

export default Contact