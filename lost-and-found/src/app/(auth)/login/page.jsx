'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

// Reusable Input Component
const InputField = ({ type, name, placeholder, value, onChange }) => (
  <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} required />
);

export default function AuthPage() {
  const router = useRouter();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [authData, setAuthData] = useState({
    signUp: { name: '', email: '', password: '' },
    signIn: { email: '', password: '' },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Toggle Panels
  const togglePanel = (isSignUp) => setIsRightPanelActive(isSignUp);

  // Handle form change for both sign-in and sign-up
  const handleInputChange = (e, type) => {
    setAuthData((prevData) => ({
      ...prevData,
      [type]: { ...prevData[type], [e.target.name]: e.target.value },
    }));
  };

  // Handle form submissions
  const handleFormSubmit = async (e, type) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (type === 'signUp') {
      // Sign Up Logic
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify(authData.signUp),
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          // Sign-up successful, attempt to sign in
          const signInRes = await signIn('credentials', {
            redirect: false,
            email: authData.signUp.email,
            password: authData.signUp.password,
          });

          if (signInRes?.error) {
            setError('Sign-in after sign-up failed');
          } else {
            setError('');
            router.push('/home'); // Redirect after successful sign-in
          }
        } else {
          const errorData = await res.json();
          setError(errorData.error || errorData.message || 'Sign-up failed');
        }
      } catch (error) {
        setError('Something went wrong during sign-up.');
      }
    } else {
      // Sign In Logic
      try {
        const res = await signIn('credentials', {
          redirect: false,
          email: authData.signIn.email,
          password: authData.signIn.password,
        });

        if (res?.error) {
          setError(res.error || 'Sign-in failed');
        } else {
          setError('');
          router.push('/home');
        }
      } catch (error) {
        setError('Something went wrong during sign-in.');
      }
    }

    setLoading(false);
  };

  const spans = new Array(200).fill(0);

  return (
    <div className={styles.ctr}>
      <section className={styles.section}>
        {spans.map((_, index) => (
          <span key={index} className={styles.span}></span>
        ))}

        <div className={`${styles.container} ${isRightPanelActive ? styles.rightPanelActive : ''}`}>
          {/* Sign-Up Form */}
          <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
            <form onSubmit={(e) => handleFormSubmit(e, 'signUp')}>
              <h1>Create Account</h1>
              {error && isRightPanelActive && <p className={styles.error}>{error}</p>}
              <span>or use your email for registration</span>
              <InputField
                type="text"
                name="name"
                placeholder="Name"
                value={authData.signUp.name}
                onChange={(e) => handleInputChange(e, 'signUp')}
              />
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                value={authData.signUp.email}
                onChange={(e) => handleInputChange(e, 'signUp')}
              />
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={authData.signUp.password}
                onChange={(e) => handleInputChange(e, 'signUp')}
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
          </div>

          {/* Sign-In Form */}
          <div className={`${styles.formContainer} ${styles.signInContainer}`}>
            <form onSubmit={(e) => handleFormSubmit(e, 'signIn')}>
              <h1>Sign in</h1>
              {error && !isRightPanelActive && <p className={styles.error}>{error}</p>}
              <span>or use your account</span>
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                value={authData.signIn.email}
                onChange={(e) => handleInputChange(e, 'signIn')}
              />
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                value={authData.signIn.password}
                onChange={(e) => handleInputChange(e, 'signIn')}
              />
              <a href="#">Forgot your password?</a>
              <button type="submit" disabled={loading}>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          </div>

          {/* Overlay */}
          <div className={styles.overlayContainer}>
            <div className={styles.overlay}>
              <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className={styles.ghost} onClick={() => togglePanel(false)}>
                  Sign In
                </button>
              </div>
              <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start your journey with us</p>
                <button className={styles.ghost} onClick={() => togglePanel(true)}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}