import Link from 'next/link';
import styles from './Nav.module.css'; // Importing the CSS module

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.wrapper}>
        <div className={styles.logo}>
          <Link href="#" className={styles.a}>Logo</Link>
        </div>
        <input type="radio" name="slider" id="menu-btn" />
        <input type="radio" name="slider" id="close-btn" />
        <ul className={styles.navLinks}>
          <label htmlFor="close-btn" className={`${styles.btn} ${styles.closeBtn}`}>
            <i className="fas fa-times"></i>
          </label>
          <li>
            <Link href="\home" className={styles.a}>Home</Link>
          </li>
          
          <li>
            <Link href="\items" className={`${styles.a} ${styles.desktopItem}`}>Items</Link>
            <input type="checkbox" id="showDrop" />
            <label htmlFor="showDrop" className={styles.mobileItem}>
              Items
            </label>
            <ul className={styles.dropMenu}>
              <li>
                <Link href="\items" className={styles.a}>
                  All Items
                </Link>
              </li>
              <li>
                <Link href="\uritems" className={styles.a}>
                  Your Items
                </Link>
              </li>
            </ul>
          </li>
          {/* <li>
            <Link href="\form" className={styles.a}>About</Link>
          </li> */}
          <li>
            <Link href="/feedback" className={styles.a}>
              Feedback
            </Link>
          </li>
          <li>
            <Link href="/profile" className={styles.a}>
              profile
            </Link>
          </li>
        </ul>
        <label htmlFor="menu-btn" className={`${styles.btn} ${styles.menuBtn}`}>
          <i className="fas fa-bars"></i>
        </label>
      </div>
    </nav>
  );
}
