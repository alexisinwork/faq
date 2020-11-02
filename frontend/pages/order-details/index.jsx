import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/layout';
import { SearchDetails } from '../../components/shared';

function OrderDetailsSearch() {
  const router = useRouter()

  const [searchInput, setSearchInput] = useState('')

  const onSearch = () => {
    router.push(`/order-details/${searchInput}`)
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
        searchId={'search-input'}
        submitId={'submit'}
      />
    </Layout>
  );
};

export default OrderDetailsSearch;