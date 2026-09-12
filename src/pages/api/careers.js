// pages/api/careers.js
export default async function handler(req, res) {
  try {
    const response = await fetch('http://websiteapi.somtelsomalia.net/api/careers?populate=*');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('API route error:', error);
    res.status(500).json({ error: 'Failed to fetch careers data' });
  }
}