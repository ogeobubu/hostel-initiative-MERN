import React from "react";
import Navbar from "../components/Header";
import Customer from "../components/Customers";
import Footer from "../components/Footer";

import styles from "../Styles/about.module.css";

const About = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className={styles.aboutMore}>
        <div>
          <div className={styles.aboutMore__info}>
            <h1>Do you have an</h1>
            <h1>accomodation or rent ?</h1>
          </div>

          <button>Become an agent</button>
        </div>

        <div className={styles.aboutMore__backgroundImg}></div>

        <div className={styles.aboutMore__more}>
          Hostel Initiative business is located at Ile-Ife, Osun State. It is no
          hidden fact that the public universities in Nigeria have a major
          problem with accommodation. The Obafemi Awolowo University (OAU)
          suffers the same predicament, having a population of over 35,000.
          Hostel Initiative business aims to solve accommodation problems like
          this, taking it up a notch for students to have direct access to
          agents on this platform.
        </div>
      </div>
      <Customer />
      <Footer />
    </React.Fragment>
  );
};

export default About;
