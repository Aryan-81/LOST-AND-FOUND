To implement a complete authentication system in Next.js 13/14 or above, with middleware and session handling, we will set up:

1. **API Routes** for login, signup, and logout.
2. **Session Management** using **`cookies`** and **JWT tokens** (encrypted).
3. **Auth Middleware** to protect routes.
4. **Authentication Context** to manage auth state in the app.

Let's go step by step.

### Step 1: Set up `bcryptjs` and `jsonwebtoken` for password hashing and session token handling

First, install the necessary packages:
```bash
npm install bcryptjs jsonwebtoken
```

### Step 2: Database Setup (`@/lib/db.js`)

We'll need a database connection pool (e.g., PostgreSQL):
```javascript
// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export default pool;
```

### Step 3: Session Handling (`@/lib/session.js`)

We'll handle sessions using JWT tokens and store them in cookies.

```javascript
// lib/session.js
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

// Create a signed JWT token
export function createToken(payload) {
  return jwt.sign(payload, secret, { expiresIn: '1d' });
}

// Verify and decode a JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

// Encrypt (create) the token and store in cookie
export function encryptSession(res, user) {
  const token = createToken({ userId: user.id });
  res.setHeader('Set-Cookie', `session=${token}; Path=/; HttpOnly; Secure; SameSite=Strict`);
}

// Decrypt (verify) the token from the cookie
export function decryptSession(cookie) {
  if (!cookie) return null;
  const token = cookie.split('=')[1];
  return verifyToken(token);
}
```

### Step 4: API Routes

#### 1. `src/app/api/signup/route.js` (Signup API)

This route will handle user registration.

```javascript
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password, name } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const { rows } = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, name]
    );
    return NextResponse.json({ message: 'Signup successful', user: rows[0] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error signing up', error }, { status: 500 });
  }
}
```

#### 2. `src/app/api/login/route.js` (Login API)

This will verify credentials and create a session (JWT in cookies).

```javascript
import pool from '@/lib/db';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { encryptSession } from '@/app/lib/session';

export async function POST(req) {
  const { email, password } = await req.json();
  
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, rows[0].password);
    if (!isValidPassword) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Set JWT session cookie
    const res = NextResponse.json({ message: 'Login successful', user: rows[0] });
    encryptSession(res, rows[0]);

    return res;
  } catch (error) {
    return NextResponse.json({ message: 'Error logging in', error }, { status: 500 });
  }
}
```

#### 3. `src/app/api/logout/route.js` (Logout API)

This will clear the session cookie.

```javascript
import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logout successful' });
  res.headers.set('Set-Cookie', 'session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict');
  return res;
}
```

#### 4. `src/app/api/auth/check/route.js` (Session Check API)

This route checks if the user is authenticated.

```javascript
import { decryptSession } from '@/app/lib/session';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const cookie = req.headers.get('cookie');
  const session = decryptSession(cookie);

  if (!session) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Authenticated', userId: session.userId }, { status: 200 });
}
```

### Step 5: Middleware (Route Protection)

This middleware will protect routes based on session validation.

#### `middleware.js`

```javascript
import { NextResponse } from 'next/server';
import { decryptSession } from '@/app/lib/session';
import { cookies } from 'next/headers';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/signup'];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get('session')?.value;
  const session = decryptSession(cookie);

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  if (isPublicRoute && session?.userId && path !== '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
```

### Step 6: Authentication Context

For managing authentication state globally within your app.

#### `src/app/context/AuthContext.js`

```javascript
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth/check');
      if (res.status === 200) {
        const data = await res.json();
        setUser(data.userId);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

#### `src/app/components/AuthGuard.js`

```javascript
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthGuard({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // Optionally add a loading spinner here
  }

  return children;
}
```

### Step 7: Layout Integration

#### `src/app/layout.js`

```javascript
import { AuthProvider } from './context/AuthContext';
import AuthGuard from './components/AuthGuard';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <AuthGuard>{children}</AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Explanation:
- **JWT-based Sessions**: Sessions are managed using JWT tokens, stored in cookies with HTTP-only, Secure, and SameSite flags for security.
- **Middleware**: Protects sensitive routes like `/dashboard` by checking the session in the cookie.
- **Auth Context**: Handles global authentication state within the app.
- **Protected Routes**: Uses `AuthGuard` to ensure only authenticated users can access certain pages.

This provides a robust authentication system for your Next.js project with session management and route protection.