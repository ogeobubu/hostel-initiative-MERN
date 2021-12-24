import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";
import help from "../assets/help.png";
import { aboutResponsive, tablet, mobile } from "../responsive.js";

const Section = styled.section`
  margin-top: 70px;
`;
const Container = styled.div`
  padding: 2rem 6rem;
  ${aboutResponsive({
    padding: "2rem 4rem",
  })};
  ${tablet({
    padding: "2rem",
  })};
`;
const Title = styled.h2`
  font-family: Lora;
  font-style: normal;
  font-weight: bold;
  font-size: 45px;
  line-height: 153.5%;
  color: #3a3b7b;
  width: 50%;
  margin-bottom: 46px;
  ${tablet({
    width: "90%",
  })};
  ${mobile({
    fontSize: "35px",
    width: "100%",
  })};
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const Text = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 224.5%;
  color: #7b7b7b;
  width: 91%;
  margin-bottom: 35px;
`;

const Help = () => {
  return (
    <Section>
      <Container>
        <Title>Let’s help you get a comfortable accomodation</Title>
      </Container>
      <Image src={help} alt="help" />
      <Container>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        <Link className="link" to="/market">
          <Button text="Go to Marketplace" />
        </Link>
      </Container>
    </Section>
  );
};

export default Help;
