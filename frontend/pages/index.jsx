import Layout from '../components/layout';

export default function App() {
  const callAPI = () => {
    callDB()

    fetch("http://localhost:3000/api/orders")
        .then(res => res.text())
        .then(res => this.setState({ apiResponse: res }))
        .catch(err => err)
  }


  return (
    <Layout>
      <h1 onClick={callAPI}>The challenge content goes here.</h1>
    </Layout>
  );
};
