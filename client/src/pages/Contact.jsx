import React from "react";
import styles from "../Styles/contact.module.css";
import Footer from "../components/Footer";
import Navbar from "../components/Header";

const Contact = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.contact}>
        <h1>Contact Us</h1>

        <div className={styles.contact__info}>
          <p>
            While we're good with connecting you to an agent, there are simpler
            ways for us to get
          </p>
          <p>in touch and answer your questions.</p>
        </div>

        <div className={styles.contact__form}>
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input type="text" placeholder="e.g Emore Ogheneyoma" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <br />
            <input type="email" placeholder="e.g - hotelinitiative@gmail.com" />
          </div>

          <div>
            <label htmlFor="message">Message</label> <br />
            <textarea
              type="email"
              placeholder="e.g - hotelinitiative@gmail.com"
            />
          </div>

          <button className={styles.contact__button}>Contact Us</button>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Contact;
