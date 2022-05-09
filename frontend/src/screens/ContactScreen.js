import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput } from 'mdbreact';
import emailjs from '@emailjs/browser';

//import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
//import { Button } from 'bootstrap';

const Result = () => {
  return (
    <p>Your message has been successfully sent. I will contact you soon</p>
  );
};

export default function ContactScreen() {
  const form = useRef();

  const [result, showResult] = useState(false);
  const sendEmail = async (e) => {
    e.preventDefault();
    e.target.reset(null);

    emailjs
      .sendForm(
        'service_z8zjpse',
        'template_zheh10e',
        form.current,
        '5P9l7youjn0x2nHYN'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
    showResult(true);
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <MDBRow>
        <MDBCol md="6">
          <Form ref={form} onSubmit={sendEmail}>
            <h1 className="mb-3">Write to us</h1>
            <div className="grey-text">
              <MDBInput
                name="FullName"
                label="Your name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                name="email"
                label="Your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                name="subject"
                label="Subject"
                icon="tag"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                name="message"
                type="textarea"
                rows="2"
                label="Your message"
                icon="pencil-alt"
              />
            </div>
            <div className="text-center">
              <Button type="submit" variant="outline-info">
                Send
                <MDBIcon far icon="paper-plane" className="ml-1" />
              </Button>
            </div>
          </Form>
          <div className="row">{result ? <Result /> : null}</div>
        </MDBCol>
      </MDBRow>
    </Container>
  );
}
