import React, { useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import { MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import emailjs from '@emailjs/browser';

//import Button from 'react-bootstrap/esm/Button';
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
    // e.target.reset(null);

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
    <MDBContainer className="small-container">
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <MDBRow>
        <MDBCol md="6">
          <Form ref={form} onSubmit={sendEmail}>
            <h1 className="mb-3">Write to us</h1>
            <div className="grey-text">
              <InputGroup className="d-flex me-auto">
                <InputGroup.Text id="basic-addon1">
                  <MDBIcon icon="user-alt" className="ml-1" />
                </InputGroup.Text>
                <FormControl
                  placeholder="Username"
                  aria-label="FullName"
                  aria-describedby="basic-addon1"
                  name="FullName"
                />
              </InputGroup>

              <InputGroup className="d-flex me-auto">
                <InputGroup.Text id="basic-addon1">
                  <MDBIcon icon="at" className="ml-1" />
                </InputGroup.Text>
                <FormControl
                  placeholder="Email"
                  aria-label="email"
                  aria-describedby="basic-addon1"
                  name="email"
                />
              </InputGroup>
              <InputGroup className="d-flex me-auto">
                <InputGroup.Text id="basic-addon1">
                  <MDBIcon icon="tag" className="ml-1" />
                </InputGroup.Text>
                <FormControl
                  placeholder="subject"
                  aria-label="subject"
                  aria-describedby="basic-addon1"
                  name="subject"
                />
              </InputGroup>

              <InputGroup className="d-flex me-auto">
                <InputGroup.Text id="basic-addon1">
                  {' '}
                  <MDBIcon icon="pencil-alt" className="ml-1" />{' '}
                </InputGroup.Text>
                <FormControl
                  placeholder="Your message"
                  aria-label="message"
                  aria-describedby="basic-addon1"
                  name="message"
                />
              </InputGroup>
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
    </MDBContainer>
  );
}
