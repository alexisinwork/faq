import Layout from '../components/layout';
import updatePageView from '../utils/updatePageView'

function Orders({ orders }) {
  return (
    <Layout>
      <h1>Orders</h1>
    </Layout>
  );
};

// This function gets called at build time
export async function getStaticProps() {
  // Storing page view on any route render
  await updatePageView('order-details')
  // Call an external API endpoint to get posts
  const res = await fetch(`${process.env.API_URL}/orders`)
  const orders = await res.json();

  return {
      props: {
          orders,
      },
  };
}

export default Orders