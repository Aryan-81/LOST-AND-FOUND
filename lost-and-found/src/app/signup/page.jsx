
import styles from './page.module.css';

export default function SignUp() {
  const spans = Array.from({ length: 200 }, (_, i) => i);

  return (
    <div className={styles.ctr}>
      <section className={styles.section}>
        {spans.map((_, index) => (
          <span key={index} className={styles.span}></span>
        ))}

        <div className={styles.signin}>
          <div className={styles.content}>
            <h2>Sign In</h2>
            <div className={styles.form}>
              <div className={styles.inputBox}>
                <input type="text" required />
                <i>Username</i>
              </div>
              <div className={styles.inputBox}>
                <input type="password" required />
                <i>Password</i>
              </div>
              <div className={styles.links}>
                <a href="#">Forgot Password</a>
                <a href="#">Signup</a>
              </div>
              <div className={styles.inputBox}>
                <input type="submit" value="Login" className={styles.submitButton} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
};

