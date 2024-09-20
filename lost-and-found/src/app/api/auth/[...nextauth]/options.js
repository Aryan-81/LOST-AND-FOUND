// [...nextauth]/option 
import Credentials from 'next-auth/providers/credentials';

import { pool } from '@/lib/db';
import bcrypt from 'bcrypt';

export const authOptions = ({
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
          const user = result.rows[0];
          if (!user) {
            throw new Error('No user found with this email');
          }
          // Verify password
          const isValidPassword = await bcrypt.compare(password, user.hash_password);
          if (isValidPassword) {
            return {
              id: user.usr_id,
              name: user.name,
              email: user.email,
            };
          } else {
            throw new Error('Incorrect password');
          }
        } catch (error) {
          console.error('Database query error:', error);
          throw new Error('Error querying the database.');
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth?action=login',
    signUp: '/auth?action=signup',
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,  // 30 minutes session lifetime
    updateAge: 5 * 60,  // Token is updated every 5 minutes
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    encryption: true,
    maxAge: 30 * 60,  // Same as session maxAge
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user.id?.toString();
        token.username = user.name?.toString() ?? "unkoun";
        token.iat = Math.floor(Date.now() / 1000);  // Set issued at timestamp
        token.exp = token.iat + 30 * 60;  // Expiration set to 30 minutes
      }
    
      // Token rotation logic
      const currentTime = Math.floor(Date.now() / 1000);
      const expirationTime = token.exp;
    
      // If the token has expired, return null or refresh the token
      if (currentTime > expirationTime) {
        console.warn("Token expired. Consider refreshing the session or redirecting to login.");
        return null;  // Optionally, refresh the token here or handle re-authentication
      }
    
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id ;
        session.user.username = token.username ;
        
        if (!session.user._id) {
          console.warn("Warning: session.user._id is undefined.");
        }
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: process.env.NODE_ENV === 'production',  // Ensures HTTPS is required in production
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: false,  // CSRF token must be accessible by the client
        sameSite: 'strict',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },  
})
