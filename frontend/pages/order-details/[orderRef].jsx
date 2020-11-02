import React, { useState } from 'react'
import { useRouter } from 'next/router'
import API_URL from '../../config'
import updatePageView from '../../utils/updatePageView'
import Layout from '../../components/layout';
import { SearchDetails } from '../../components/shared';

function OrderDetails({ orders }) {
  const router = useRouter()
  const { orderRef } = router.query
  const curOrder = orders.find(order => order.reference === orderRef)
  const [searchInput, setSearchInput] = useState('')

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
          ? <p>{curOrder.reference}</p>
          : <div>Cannot find order</div>
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