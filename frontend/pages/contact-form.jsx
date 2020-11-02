import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha';
import API_URL, { API_CAPTCHA_SITE_KEY } from '../config'
import Layout from '../components/layout';
import updatePageView from '../utils/updatePageView'
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Dropdown,
  Button
} from 'react-bootstrap'
// Styles
const alignedText = { lineHeight: 2.5 }

function ContactForm({ orders }) {
  const [orderReference, setOrderReference] = useState(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [captcha, setCaptcha] = useState(null)
  
  const isEnabled = orderReference && name && phone && email && message && captcha

  const onSubmit = () => {
    console.log(orderReference, name, phone, email, message, captcha)
  }

  return (
    <Layout>
      <h2 className="text-center" data-testid="heading">
        Contact Form
      </h2>
      <Container>
        <Row className="mt-4 pt-4">
          <Col style={alignedText} xs={4} sm={4} md={3} lg={2} xl={2}>
            Order:
          </Col>
          <Col xs={8} sm={8} md={9} lg={10} xl={10}>
            <Dropdown variant="light">
              <Dropdown.Toggle className="pl-5 pr-5" data-testid="dropdown-basic">
                {orderReference ? orderReference : 'Select order reference'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                { orders.map(({ reference }) => (
                  <Dropdown.Item
                    key={reference}
                    data-testid="dropdown-item"
                    onClick={() => setOrderReference(reference)}>
                      {reference}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col style={alignedText} xs={4} sm={4} md={3} lg={2} xl={2}>
            Name:
          </Col>
          <Col xs={8} sm={8} md={9} lg={10} xl={10}>
            <InputGroup >
              <FormControl
                placeholder="Your name..."
                data-testid="name-input"
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                aria-label="name"
                aria-describedby="name"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col style={alignedText} xs={4} sm={4} md={3} lg={2} xl={2}>
            Phone:
          </Col>
          <Col xs={8} sm={8} md={9} lg={10} xl={10}>
            <InputGroup >
              <FormControl
                placeholder="Your phone..."
                data-testid="phone-input"
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
                aria-label="phone"
                aria-describedby="phone"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col style={alignedText} xs={4} sm={4} md={3} lg={2} xl={2}>
            Email:
          </Col>
          <Col xs={8} sm={8} md={9} lg={10} xl={10}>
            <InputGroup >
              <FormControl
                placeholder="Your email..."
                data-testid="email-input"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="email"
                aria-describedby="email"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col style={alignedText} xs={4} sm={4} md={3} lg={2} xl={2}>
            Message:
          </Col>
          <Col xs={8} sm={8} md={9} lg={10} xl={10}>
            <InputGroup>
              <FormControl as="textarea" rows={3}
                placeholder="Your message..."
                data-testid="message-input"
                defaultValue={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-label="email"
                aria-describedby="email"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col style={alignedText} xs={4} sm={4} md={3} lg={2} xl={2}></Col>
          <Col>
            <ReCAPTCHA
              data-testid="captcha"
              sitekey={API_CAPTCHA_SITE_KEY}
              onChange={setCaptcha}
            />
          </Col>
          <Col className="text-right mt-3">
            <Button 
              data-testid="submit"
              disabled={!isEnabled}
              variant="light"
              onClick={onSubmit}>
                Submit
            </Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

// This function gets called at build time
export async function getServerSideProps() {
  // Storing page view on any route render
  await updatePageView('order-details')
  // Call an external API endpoint to get posts
  const res = await fetch(`${API_URL}/orders`)
  const orders = await res.json();

  return {
    props: {
      orders
    }
  }
}


export default ContactForm;