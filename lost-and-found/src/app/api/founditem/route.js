// src/app/pages/api/founditems.js
import pool from '@/lib/db'; 

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM founditem');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching data from PostgreSQL', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
