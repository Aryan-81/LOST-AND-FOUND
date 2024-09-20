'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import styles from './page.module.css';
import LogoutBtn from '@/components/buttons/LogoutBtn';
import Nav from '@/components/Nav';

const UserProfile = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>; // Optional loading state while session is being fetched
  }

  const username = session?.user?.name ?? 'notdefine'; // Get username from session
  const email = session?.user?.email ?? 'notdefine';  // Get email from session


  return (
    <main className={styles.container}>
      <Nav />
      <div className={styles.crCtr}>
        <div className={styles.cr1}></div>
        <div className={styles.cr2}></div>
        <div className={styles.cr3}></div>
        <div className={styles.cr4}></div>
      </div>

      <div className={styles.card}>
        <div className={styles.avatarCtr}>
          <img src="" alt="ur_pic" />
        </div>
        <div className={styles.info}>
          <div className={styles.infoctr1}>
            <h1 className={styles.name}>{username} </h1>
            <h4>email: {email} <br /> ph: 2342342323</h4>
            <h3>Total Items Reported : n</h3>
            <h3>Total Successful Returns: m</h3>

          </div>
          {/* <hr />
          <div className={styles.infoctr2}>

          </div> */}
        </div>
        <div className={styles.logout}><LogoutBtn type={'rdbtn'} /></div>

      </div>
    </main>
  );
};

export default UserProfile;