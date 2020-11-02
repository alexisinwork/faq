import API_URL from '../config'
// Storing page view on any route render
export default async function updatePageView (page) {
  return await fetch(
    `${API_URL}/page-views/${page}`,
    {
    // Adding method type 
    method: "POST", 
    // Adding body or contents to send 
    body: JSON.stringify({}), 
    // Adding headers to the request 
    headers: { 
        "Content-type": "application/json; charset=UTF-8"
    } 
  })
}