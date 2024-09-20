// src/app/api/auth/_log/route.js

export async function POST(request) {
    const { method } = request;
  
    if (method === 'POST') {
      try {
        const data = await request.json();
        // Log or process the data here
        console.log('Log data:', data);
        return new Response('Log entry created', { status: 200 });
      } catch (error) {
        console.error('Error logging data:', error);
        return new Response('Error logging data', { status: 500 });
      }
    } else {
      return new Response('Method Not Allowed', { status: 405 });
    }
  }
  