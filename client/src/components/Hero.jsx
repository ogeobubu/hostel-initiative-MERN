import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "./Button";
import hero from "../assets/hero.png";
import { aboutResponsive, tablet, mobile } from "../responsive.js";
import WindowSize from "../hooks/windowSize";

const HeroSection = styled.section`
  overflow-x: hidden;
`;
const Container = styled.div`
  padding: 2rem 6rem;
  display: flex;
  justify-content: space-between;
  height: 70vh;
  align-items: center;
  ${aboutResponsive({
    padding: "2rem 4rem",
  })};
  ${tablet({
    padding: "2rem",
  })};
`;
const Left = styled.div`
  width: 42%;
  ${aboutResponsive({
    position: "absolute",
    zIndex: 3,
  })};
  ${tablet({
    width: "61%",
  })}
`;
const Text = styled.h1`
  font-family: Lora;
  font-style: normal;
  font-weight: bold;
  font-size: 45px;
  line-height: 153.5%;
  color: #3a3b7b;
  ${mobile({
    fontSize: "35px",
  })};
`;
const Right = styled.div`
background: ${(props) => (props.img ? `url(${hero}) no-repeat` : null)};
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  width: 630px;
  height: 100vh;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.size && "column"};
`;

const Hero = () => {
  const size = WindowSize();

  return (
    <HeroSection>
      <Container>
        <Left>
          <Text>Connecting you with the right accomodation in Ile-ife</Text>
          <Flex size={size.width < 530}>
            <Link className="link" to="/market">
              <Button text="Go to Marketplace" main="true" />
            </Link>
            <Link className="link" to="/signup">
              <Button text="Become an Agent" size="true" outline="true" />
            </Link>
          </Flex>
        </Left>
        <Right img={hero} />
      </Container>
    </HeroSection>
  );
};

export default Hero;
