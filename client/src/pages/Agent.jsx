import React from "react";
// import '../src/Styles/Agent.css';
import "../Styles/Agent.module.css";
import Logo from "../assets/logo.png";
import LogoName from "../assets/logoName.png";
import AgentImage from "../assets/agentImg.png";
import LeftArrow from "../assets/leftArrow.png";
import RightArrow from "../assets/rightArrow.png";

const Agent = () => {
  const partners = [1, 2, 3, 4, 5, 6];
  const mappedPartners = partners.map((partner) => (
    <div className="partner__examples">
      <img src={Logo} alt="logo" />
      <img src={LogoName} alt="HostelInitiative" />
    </div>
  ));
  return (
    <div className="agent">
      {/* Agent 1st Section */}
      <div className="agent__text">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque optio
          cupiditate fugiat dolore magnam perspiciatis quaerat et? Officia
          voluptas rerum expedita sequi dolore ipsam quod corrupti assumenda ex
          sunt. Dignissimos veritatis dolorum amet praesentium, eligendi,
          debitis consequatur autem consequuntur reprehenderit dolore sunt
          placeat recusandae voluptas nihil accusamus voluptate, quae
          repellendus.
        </p>

        <div className="agent__details">
          <div className="agent__image">
            <img src={AgentImage} alt="AgentImg" />
          </div>
          <div className="agent__detailInfo">
            <p className="agent__name">Akinyemi Abass</p>
            <p className="agent__description">Agent for Heroku house</p>
          </div>
        </div>

        <div className="agent__navigation">
          <button>
            <img src={LeftArrow} alt="leftArrow" />
          </button>
          <button
            className="second"
            style={{ background: "white", marginLeft: "40px" }}
          >
            <img src={RightArrow} alt="rightArrow" />
          </button>
        </div>
      </div>

      {/* Agent 2nd Section */}
      <div className="agent__customers">
        <div>
          <h3>Our Agents and</h3>
          <h3>customers trust us</h3>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit Officia
            maiores{" "}
          </p>
          <p>molestiae non deleniti quaerat odio?</p>
        </div>

        <div class="agent__customer-2">
          <p>Meet our Partners</p>

          <section>{mappedPartners}</section>
        </div>
      </div>
    </div>
  );
};

export default Agent;
