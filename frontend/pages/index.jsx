import { useEffect } from 'react'
import Layout from '../components/layout';
import { useRouter } from 'next/router'
import updatePageView from '../utils/updatePageView'

function App() {
  const router = useRouter()

  return (
    <Layout>
      <h1 onClick={() => router.push('/order-details')}>The challenge content goes here.</h1>
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