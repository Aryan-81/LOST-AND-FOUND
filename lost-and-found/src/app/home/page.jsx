// src/app/home/page.js

import styles from './page.module.css';
import Button1 from '../components/buttons/Button1';
import Nav from '../components/Nav';
export default function HomePage() {
  const usr_name = 'Adam'

  return (
    <main className={styles.container}>
      <Nav/>
      <div className={styles.mesg}>
        <h1>Welcome,</h1>
        <h1>{usr_name}</h1>
        <h3>to IIT Jammu Lost and Found Website</h3>
      </div>


      <div className={styles.menu}>
        <Button1 text={'See Found/Lost Items'} href={'/items'} />
        <Button1 text={'Report Items Found/Lost'} href={'/form'} />
      </div>


    </main>
  );
}


// 'use client';

// import { useContext, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/context/AuthContext';
// import styles from './page.module.css';

// export default function HomePage() {
//   const { user, logout } = useContext(AuthContext);
//   const router = useRouter();

//   useEffect(() => {
//     if (!user) {
//       router.push('/login'); // Redirect to the login page if the user is not logged in
//     }
//   }, [user, router]);

//   if (!user) return null; // Optionally render nothing while redirecting

//   return (
//     <div className={styles.container}>
//       <h1>Welcome, {user.email}</h1>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// }
