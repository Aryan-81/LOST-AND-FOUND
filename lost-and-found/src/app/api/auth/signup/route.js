import { pool } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { email, name, password } = await req.json();

  try {
    // Check if user already exists
    const result = await pool.query('SELECT 1 FROM users WHERE email = $1', [email]);

    if (result.rows.length > 0) {
      return new Response(JSON.stringify({ error: 'User already exists' }), { status: 400 });
    }

    // Hash the password before storing it
    const hashPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    await pool.query(
      'INSERT INTO users (email, name, hash_password) VALUES ($1, $2, $3)',
      [email, name, hashPassword]
    );

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    console.error('Failed to register user:', error);
    return new Response(JSON.stringify({ error: 'Failed to register user' }), { status: 500 });
  }
}
