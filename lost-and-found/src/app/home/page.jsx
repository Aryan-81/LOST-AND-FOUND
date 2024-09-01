// src/app/home/page.js

import styles from './page.module.css';
import Button1 from '../components/buttons/Button1';
import VantaGlobe from '../components/VantaGlobe';

export default function HomePage() {
  const usr_name = 'person_1'

  return (
    <div className={styles.container}>
      {/* <VantaGlobe/> */}
      <div className={styles.mesg}>
        <h1>Welcome,</h1>
        <h1>{usr_name}</h1>
        <h3>to IIT Jammu lost and find website</h3>
      </div>


      <div className={styles.menu}>
        <Button1 text={'find object'} />
        <Button1 text={'reported object'} />
        <Button1 text={'Your List'} />
      </div>


    </div>
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
