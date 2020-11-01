import { useEffect } from 'react'
import Layout from '../components/layout';
import { useRouter } from 'next/router'
import updatePageView from '../utils/updatePageView'
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Card
} from 'react-bootstrap'

// Styles
const iconStyles = {
  WebkitTransform: 'rotateY(180deg)',
        transform: 'rotateY(180deg)'
}

const hoverStyles = {
  cursor: 'pointer'
}
// END Styles

function App() {
  const router = useRouter()

  const goToOrders = () => {
    router.push('/order-details')
  }
  
  const goToContactForm = () => {
    router.push('/contact-form')
  }

  return (
    <Layout>
      <h2 className="text-center" data-testid="heading">
        Help Center
      </h2>
      <Container>
        <Row>
          <Col>
            <InputGroup size="lg" className="mb-4 mt-5">
              <InputGroup.Prepend>
                <InputGroup.Text 
                  id="search"
                  style={iconStyles}>
                  &#8981;
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Search..."
                data-testid="search-input"
                aria-label="search"
                aria-describedby="search"
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Card className="text-center" style={hoverStyles} onClick={goToContactForm}>
              <Card.Body data-testid="contact-form">
                <Card.Title>
                  Contact Form
                </Card.Title>
                <Card.Text>
                  This will redirect you to the Contact Form
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <Card className="text-center" style={hoverStyles} onClick={goToOrders}>
              <Card.Body data-testid="order-details">
                <Card.Title>
                  Orders
                </Card.Title>
                <Card.Text>
                  This will redirect you to the Order search page
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

// This function gets called at build time
export async function getStaticProps() {
  // Storing page view on any route render
  await updatePageView('home')
  return {
    props: {}
  }
}

export default App;