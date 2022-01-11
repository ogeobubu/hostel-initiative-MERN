import React from "react";
import styles from '../Styles/About.module.css';

const AboutCom = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default AboutCom;
