// pages/api/blogs.js
export default async function handler(req, res) {
  const { page = 1 } = req.query;
  
  try {
    const response = await fetch(
      `http://websiteapi.somtelsomalia.net/api/blogs?pagination[page]=${page}&pagination[pageSize]=6&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Blog API error:', error);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
}