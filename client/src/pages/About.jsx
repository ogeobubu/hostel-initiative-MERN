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
          It's so not everyone has enough time to get a walk during business
          times, but when working in a field that involves psychological
          business, taking the path is inevitably to let your mind have some
          rest. It might also help you to get the method. You don't want to move
          kilometres, but go to the store or take a walk in the office's field
          or inside, for a couple of hours and a glance of the idea will come.
          You can easily have an accomodation or rent through this platform.
        </div>
      </div>
      <Customer />
      <Footer />
    </React.Fragment>
  );
};

export default About;
