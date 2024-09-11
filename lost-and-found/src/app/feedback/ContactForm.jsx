'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';
import Nav from '../components/Nav';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <main>
      <Nav></Nav>
      <section className={styles.contactFormctr}>
      <div className={styles.container}>
        <div className={styles.contactInfo}>
          <div>
            <h2>Contact Info</h2>
            <ul className={styles.info}>
              <li>
                <span><img src='/img/location.png' alt="location" /></span>
                <span>
                  Indian Institute of Technology Jammu <br/>
                  Jagti, NH-44 , PO Nagrota <br/>
                  Jammu - 181 221 J&K,  India
                </span>
              </li>
              <li>
                <span><img src='/img/mail.png' alt="mail" /></span>
                <span>llaryanllrajll@gamil.com</span>
              </li>
              
            </ul>
          </div>
          <ul className={styles.socialIcon}>
            <li><a href="https://github.com/Aryan-81" target='_blank'><img src='/img/github.svg' width='25px' alt="social1" /></a></li>
            <li><a href="#"><img src='/img/3.png' alt="social2" /></a></li>
            <li><a href="#"><img src='/img/5.png' alt="social3" /></a></li>
          </ul>
        </div>

        <div className={styles.contactForm}>
          <h2>Get In Touch</h2>
          <form className={styles.formBox} onSubmit={handleSubmit}>
            <div className={`${styles.inputBox} ${styles.w50}`}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <span>Name</span>
            </div>
            <div className={`${styles.inputBox} ${styles.w50}`}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <span>Email</span>
            </div>
            <div className={`${styles.inputBox} ${styles.w50}`}>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
              <span>Mobile Number</span>
            </div>
            <div className={`${styles.inputBox} ${styles.w100}`}>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <span>Write Your Message Here.</span>
            </div>
            <div className={`${styles.inputBox} ${styles.w100}`}>
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </section>
    </main>
    
  );
};

export default ContactForm;
