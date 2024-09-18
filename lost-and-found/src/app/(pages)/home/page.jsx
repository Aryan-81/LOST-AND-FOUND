'use client';
import { useSession } from 'next-auth/react';
import Nav from '@/components/Nav';
import Button1 from '@/components/buttons/Button1';
import styles from './page.module.css';
import LogoutBtn from '@/components/buttons/LogoutBtn';

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>; // Optional loading state while session is being fetched
  }

  const username = session?.user?.name ?? 'notdefine'; // Get username from session
  const email = session?.user?.email ?? 'notdefine';  // Get email from session

  return (
    <main className={styles.container}>
      <Nav />
      <div className={styles.mesg}>
        <h1>Welcome,</h1>
        <h1>{username}</h1>
        <h3>to IIT Jammu Lost and Found Website</h3>
        <p>Your Email: {email}</p> 
      </div>

      <div className={styles.menu}>
        <Button1 text={'See Found/Lost Items'} href={'/items'} />
        <Button1 text={'Report Items Found/Lost'} href={'/form'} />
        <LogoutBtn type={'rdbtn'} />
      </div>
    </main>
  );
}
