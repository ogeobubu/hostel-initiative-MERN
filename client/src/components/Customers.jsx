import styled from "styled-components";
import me from "../assets/me.png";
import logo from "../assets/logo.png";
import Arrows from "./Arrows";
import { aboutResponsive, tablet, mobile } from "../responsive.js";

const Section = styled.section`
  margin-top: 120px;
`;
const Container = styled.div`
  padding: 2rem 6rem;
  display: flex;
  justify-content: space-between;

  ${aboutResponsive({
    flexDirection: "column",
    padding: "2rem 4rem",
  })};

  ${tablet({
    padding: "2rem",
  })};
`;
const Left = styled.div`
  width: 532px;
  background: #854bff;
  border-radius: 10px;
  padding: 56px 54px;
  margin-right: 97px;

  ${aboutResponsive({
    margin: "0 auto",
    marginBottom: "1.5rem",
  })};

  ${tablet({
    width: "100%",
  })};

  ${mobile({
    padding: "32px",
  })};
`;
const Text = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 224.5%;
  color: #ffffff;
  margin-bottom: 30px;
`;
const User = styled.div`
  display: flex;
`;
const ImageContainer = styled.div`
  margin-right: 19px;
`;
const Bio = styled.div`
  display: flex;
  flex-direction: column;
`;
const Image = styled.img``;
const Name = styled.h4`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 153.5%;
  color: #ffffff;
`;
const Job = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 171.5%;
  color: rgba(255, 255, 255, 0.67);
`;
const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 65px;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  ${aboutResponsive({
    margin: "0 auto",
    textAlign: "center",
    alignItems: "center",
  })};
  ${tablet({
    width: "100%",
  })}
`;
const Title = styled.h4`
  font-family: Lora;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 153.5%;
  color: #3a3b7b;
  width: 75%;
  ${tablet({
    width: "100%",
  })}
`;
const Desc = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 163%;
  color: #7b7b7b;
  margin-bottom: 49px;
`;
const Meet = styled.div``;
const Head = styled.h6`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 153.5%;
  color: #929292;
  margin-bottom: 20px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-right: 21.79px;
  gap: 1.5rem;
  ${aboutResponsive({
    marginRight: 0,
  })};
  ${mobile({
    gridTemplateColumns: "repeat(1, 1fr)",
    gap: "2rem",
  })}
`;

const Customers = () => {
  return (
    <Section>
      <Container>
        <Left>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse
          </Text>

          <User>
            <ImageContainer>
              <Image src={me} alt="me" />
            </ImageContainer>
            <Bio>
              <Name>Akinyemi Abass</Name>
              <Job>Agent for Heroku house</Job>
            </Bio>
          </User>

          <Flex>
            <Arrows profileOutline="true" />
            <Arrows profile="true" darkRights="darkRight" />
          </Flex>
        </Left>
        <Right>
          <Title>Our Agents and customers trust us</Title>
          <Desc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et
          </Desc>

          <Meet>
            <Head>Meet Our Partners</Head>
            <Grid>
              <Image src={logo} alt="logo" />
              <Image src={logo} alt="logo" />
              <Image src={logo} alt="logo" />
              <Image src={logo} alt="logo" />
              <Image src={logo} alt="logo" />
              <Image src={logo} alt="logo" />
            </Grid>
          </Meet>
        </Right>
      </Container>
    </Section>
  );
};

export default Customers;
