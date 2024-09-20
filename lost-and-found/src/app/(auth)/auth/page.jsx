'use client';
import { signIn } from 'next-auth/react';
import { useState, useEffect, useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

// Memoized Input Field to prevent unnecessary re-renders
const InputField = memo(({ type, name, placeholder, value, onChange }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required
    className={styles.input}
  />
));

export default function AuthPage() {
  const router = useRouter();
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);
  const [authData, setAuthData] = useState({
    signUp: { name: '', email: '', password: '' },
    signIn: { email: '', password: '' },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Toggle between login and signup and update URL
  const togglePanel = (isSignUp) => {
    setIsRightPanelActive(isSignUp);
    const action = isSignUp ? 'login' : 'signup';
    router.push(`/auth?action=${action}`, undefined, { shallow: true });
  };

  // Set initial panel state based on URL query parameter
  useEffect(() => {
    const action = new URLSearchParams(window.location.search).get('action');
    setIsRightPanelActive(action === 'login');
  }, []);

  // Handle input changes for both forms
  const handleInputChange = useCallback((e, type) => {
    setAuthData((prevData) => ({
      ...prevData,
      [type]: { ...prevData[type], [e.target.name]: e.target.value },
    }));
  }, []);

  // Handle form submissions for both sign-up and sign-in
  const handleFormSubmit = useCallback(async (e, type) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { email, password } = authData[type];
    const userData = type === 'signUp' ? authData.signUp : authData.signIn;

    try {
      if (type === 'signUp') {
        // Sign-up logic
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData),
        });

        if (res.ok) {
          // Sign in after sign-up
          const signInRes = await signIn('credentials', {
            redirect: false,
            email,
            password,
          });

          if (!signInRes?.error) {
            router.push('/home');
          } else {
            setError('Sign-in after sign-up failed');
          }
        } else {
          const errorData = await res.json();
          setError(errorData.error || 'Sign-up failed');
        }
      } else {
        // Sign-in logic
        const res = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (!res?.error) {
          router.push('/home');
        } else {
          setError(res.error || 'Sign-in failed');
        }
      }
    } catch (error) {
      setError(`Something went wrong during ${type === 'signUp' ? 'sign-up' : 'sign-in'}.`);
    } finally {
      setLoading(false);
    }
  }, [authData, router]);

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
              <h1>Log In</h1>
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
                <div className={styles.chng}>
                  <p>Click the button below to sign up if you don't have an account yet.</p>
                  <button className={styles.ghost} onClick={() => togglePanel(false)}>
                    Sign Up
                  </button>
                </div>

              </div>
              <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start your journey with us</p>
                <div className={styles.chng}>
                  <p>Click the button below to log in if you already have an account.</p>
                  <button className={styles.ghost} onClick={() => togglePanel(true)}>
                    Log In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}