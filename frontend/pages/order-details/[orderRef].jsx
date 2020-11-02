import React, { useState } from 'react'
import { useRouter } from 'next/router'
import API_URL from '../../config'
import updatePageView from '../../utils/updatePageView'
import Layout from '../../components/layout';
import { SearchDetails } from '../../components/shared';
import {
  Container,
  Row,
  Col,
  Card
} from 'react-bootstrap';

function OrderDetails({ orders }) {
  const router = useRouter()
  const { orderRef } = router.query
  const curOrder = orders.find(order => order.reference === orderRef)
  const [searchInput, setSearchInput] = useState(orderRef)

  const onSearch = () => {
    router.push(`${searchInput}`)
  }

  return (
    <Layout>
      <h2 className="text-center" data-testid="heading">
        Order Details
      </h2>
      
      <SearchDetails
        className="mt-4"
        searchInput={searchInput}
        searchUpdate={setSearchInput}
        onSearch={onSearch}
        searchId={'order-search'}
        submitId={'search-button'}
      />

      {
        curOrder 
          ? <div data-testid="order">
              <p className="h4 mt-5 text-center text-warning" data-testid="order-reference">
                Order #{curOrder.reference}
              </p>
              <Container className="mt-4">
                <Row className="mb-2">
                  <Col className="text-center">
                    <p className="h4 mt-4">That costed
                      <mark data-testid="order-cost">{ curOrder.cost }</mark>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center">
                    <p className="h3" data-testid="order-delivery-status">{ curOrder.delivered
                      ? 'Delivered'
                      : 'Not delivered'
                    }</p>
                  </Col>
                </Row>
              </Container>
            </div>
          : <div className="test-center">Cannot find order</div>
      }
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


export default OrderDetails;