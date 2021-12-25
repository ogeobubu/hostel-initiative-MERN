import { useEffect } from "react";
import styled from "styled-components";
import rightArrow from "../assets/rightArrow.png";
import leftArrow from "../assets/leftArrow.png";
import darkRight from "../assets/darkRight.png";

const ArrowContainer = styled.div`
width: ${(props) => (props.outline === true ? "40px" : "50px")};
height: ${(props) => (props.outline === true ? "40px" : "50px")};
border-radius: 50%;
background: ${(props) =>
  props.outline === true
    ? " #F8F8F8"
    : props.profile === true
    ? " #FFFFFF"
    : props.profileOutline === true
    ? " rgba(255, 255, 255, 0.14)"
    : "#854BFF"};
box-shadow: 0px 1px 28px rgba(158, 158, 158, 0.31);
display: flex;
justify-content: center;
align-items: center;
margin-right: ${(props) =>
  props.outline === true
    ? "41px"
    : props.profileOutline === true
    ? "41px"
    : null};
cursor: pointer;
border: ${(props) =>
  props.outline === true
    ? "1px solid #EEEEEE"
    : props.profileOutline === true
    ? "1px solid #FFFFFF"
    : 0};
`;
const Image = styled.img``;

const Arrows = ({
  outline,
  profile,
  profileOutline,
  darkRights,
  position,
  handleClick,
  prevSlide,
  nextSlide,
  customerDirection,
}) => {
  return (
    <ArrowContainer
      profile={profile ? true : false}
      outline={outline ? true : false}
      onClick={
        position === "left"
          ? () => handleClick("left")
          : position === "right"
          ? () => handleClick("right")
          : customerDirection === "left"
          ? () => prevSlide()
          : customerDirection === "right"
          ? () => nextSlide()
          : null
      }
    >
      <Image
        src={
          outline
            ? leftArrow
            : profileOutline
            ? leftArrow
            : darkRights
            ? darkRight
            : rightArrow
        }
        alt="arrow"
      />
    </ArrowContainer>
  );
};

export default Arrows;
