'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function SignUp() {
    const spans = Array.from({ length: 200 }, (_, i) => i);
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };

    return (
        <div className={styles.ctr}>
            <section className={styles.section}>
                {spans.map((_, index) => (
                    <span key={index} className={styles.span}></span>
                ))}

                

                <div className={`${styles.container} ${isRightPanelActive ? styles.rightPanelActive : ''}`}>
                    <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
                        <form action="#">
                            <h1>Create Account</h1>
                            <div className={styles.socialContainer}>
                                <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your email for registration</span>
                            <input type="text" placeholder="Name" />
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <button>Sign Up</button>
                        </form>
                    </div>

                    <div className={`${styles.formContainer} ${styles.signInContainer}`}>
                        <form action="#">
                            <h1>Sign in</h1>
                            <div className={styles.socialContainer}>
                                <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>or use your account</span>
                            <input type="email" placeholder="Email" />
                            <input type="password" placeholder="Password" />
                            <a href="#">Forgot your password?</a>
                            <button>Sign In</button>
                        </form>
                    </div>

                    <div className={styles.overlayContainer}>
                        <div className={styles.overlay}>
                            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                                <h1>Welcome Back!</h1>
                                <p>To keep connected with us please login with your personal info</p>
                                <button className={styles.ghost} onClick={handleSignInClick}>Sign In</button>
                            </div>
                            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                                <h1>Hello, Friend!</h1>
                                <p>Enter your personal details and start journey with us</p>
                                <button className={styles.ghost} onClick={handleSignUpClick}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}; 

