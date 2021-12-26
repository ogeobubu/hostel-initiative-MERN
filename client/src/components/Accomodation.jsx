import { useState, useRef } from "react";
import styled from "styled-components";
import building from "../assets/building.png";
import Arrows from "./Arrows";
import AccomodationList from "./AccomodationList";
import { tablet, mobile } from "../responsive.js";
import WindowSize from "../hooks/windowSize";

const Section = styled.section`
  margin-top: ${(props) => (props.similar === true ? "99px" : "200px")};
  overflow-x: hidden;
padding: 0 6rem;
${mobile({
  padding: "2rem",
})};

`;
const Container = styled.div`
overflow-x: hidden;
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

const Accomodation = ({ text, similar, similarData }) => {
  const size = WindowSize();
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const listRef = useRef();

  const handleClick = (direction) => {
    setIsMoved(true);
    const mainDistance = listRef.current.getBoundingClientRect().x;
    console.log(mainDistance);
    if (direction === "left" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      const distance = listRef.current.getBoundingClientRect().x - 176;
      if (size.width > 780) {
        listRef.current.style.transform = `translateX(${347 + distance}px)`;
      } else if (size.width < 500) {
        listRef.current.style.transform = `translateX(${147 + distance}px)`;
      } else {
        listRef.current.style.transform = `translateX(${347 + distance}px)`;
      }
    } else if (direction === "right" && slideNumber < 5) {
      setSlideNumber(slideNumber + 1);
      const distance = listRef.current.getBoundingClientRect().x - 176;
      if (size.width > 780) {
        listRef.current.style.transform = `translateX(${-347 + distance}px)`;
      } else if (size.width < 500) {
        listRef.current.style.transform = `translateX(${-147 + distance}px)`;
      } else {
        listRef.current.style.transform = `translateX(${-347 + distance}px)`;
      }
    } else {
      return null;
    }
  };
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
            <Arrows outline="true" handleClick={handleClick} position="left" />
            <Arrows handleClick={handleClick} position="right" />
          </Right>
        </AccoHead>
        <AccomodationList similarData={similarData} getRef={listRef} />
      </Container>
    </Section>
  );
};

export default Accomodation;
