import React from "react";
import "../Styles/AgentListing.module.css";
import Footer from "../components/Footer";
import Navbar from "../components/Header";
import AgentListImage from "../assets/agentListImg.png";
import WhatsApp from "../assets/waDownload.jpg";
import Email from "../assets/email.png";
import PhoneIcon from "../assets/phone.png";

// conditional rendering to show all the text color as white in the .agentList__hero space
const AgentListing = () => {
  return (
    <React.Fragment>
      <div className="agentList__hero">
        <Navbar whiteLogo="true" />
        <div className="agentList__heroInfo">
          <div>
            <img src={AgentListImage} alt="agentImage" />
          </div>

          <div className="agentList__information">
            <h1>Akinyemi Abass</h1>
            <div className="agent__paragraphs">
              <p>
                Agent for Heroku houses with the aim of housing as many ile-ife
                residents as possible.
              </p>
              <p> Like what you see, send me a message</p>
            </div>

            <div className="agent__socialMedia">
              <button>
                <img src={WhatsApp} alt="icon" />
              </button>
              <button>
                <img src={Email} alt="icon" />
              </button>
              <button>
                <img src={PhoneIcon} alt="icon" /> <span>Call Agent</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="agentList">
        <h1>Agent Listing</h1>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default AgentListing;
