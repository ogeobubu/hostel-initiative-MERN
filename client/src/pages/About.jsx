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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus
          natus, itaque officia culpa nobis error sapiente commodi odio tempora
          quidem omnis earum dolorem illum, magni quaerat, architecto quas.
          Dolorem magni magnam culpa, asperiores harum ratione eos iure
          voluptatum consequuntur voluptatem numquam accusantium nobis saepe,
          consequatur obcaecati laboriosam? Eos, aperiam placeat!
        </div>
      </div>
      <Customer />
      <Footer />
    </React.Fragment>
  );
};

export default About;
