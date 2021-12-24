import styled from "styled-components";
import building from "../assets/building.png";
import Arrows from "./Arrows";
import AccomodationList from "./AccomodationList";
import { aboutResponsive, tablet, mobile } from "../responsive.js";

const Section = styled.section`
  margin-top: ${(props) => (props.similar === true ? "99px" : "263px")};
  overflow-x: hidden;
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
const AccoHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({
    flexDirection: "column",
  })};
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const Image = styled.img`
  margin-right: 20px;
  ${tablet({
    marginRight: 0,
  })};
`;
const Line = styled.div`
  width: 50px;
  height: 0px;
  border: 1px solid #854bff;
  transform: rotate(-90deg);
  margin-right: 22px;
  ${tablet({
    marginRight: 0,
  })};
`;
const Title = styled.h5`
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 179%;
  color: #3a3b7b;
  ${mobile({
    marginBottom: "1rem",
  })};
`;
const Right = styled.div`
  display: flex;
  align-items: center;
`;

const Accomodation = ({ text, similar }) => {
  return (
    <Section similar={similar ? true : false}>
      <Container>
        <AccoHead>
          <Left>
            <Image src={building} alt="building" />
            <Line />
            <Title>{text}</Title>
          </Left>
          <Right>
            <Arrows outline="true" />
            <Arrows />
          </Right>
        </AccoHead>
        <AccomodationList />
      </Container>
    </Section>
  );
};

export default Accomodation;
