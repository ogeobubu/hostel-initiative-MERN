import styled from "styled-components";
import { Link } from "react-router-dom";
import AccomodationItem from "./AccomdationItem";
import Button from "./Button";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import darkRight from "../assets/darkRight.png";
import { mobile } from "../responsive.js";
import { useSelector } from "react-redux";

const Section = styled.section`
  margin-top: 40px;
  width: 100%;
  
`;

const Container = styled.div`
display: flex;
  margin-left: 5rem;
  margin-bottom: 41px;
  width: max-content;
  overflow-x: hidden;
  transform: translateX(0);
transition: all 500ms;
  ${mobile({
    marginLeft: 0,
    width: "100%",
  })};
`;

const data = [
  {
    id: 1,
    image: image1,
    name: "Single Room at Damico",
    location: "12, Harakiri, Damico Estate, Ile-ife",
    price: "80,000",
  },
  {
    id: 2,
    image: image2,
    name: "Single Room at Damico",
    location: "12, Harakiri, Damico Estate, Ile-ife",
    price: "80,000",
  },
  {
    id: 3,
    image: image3,
    name: "Single Room at Damico",
    location: "12, Harakiri, Damico Estate, Ile-ife",
    price: "80,000",
  },
  {
    id: 4,
    image: image3,
    name: "Single Room at Damico",
    location: "12, Harakiri, Damico Estate, Ile-ife",
    price: "80,000",
  },
  {
    id: 5,
    image: image3,
    name: "Single Room at Damico",
    location: "12, Harakiri, Damico Estate, Ile-ife",
    price: "80,000",
  },
  {
    id: 6,
    image: image3,
    name: "Single Room at Damico",
    location: "12, Harakiri, Damico Estate, Ile-ife",
    price: "80,000",
  },
];

const AccomodationList = ({ current, showPage, getRef }) => {
  const allAccomodations = useSelector(
    (state) => state.accomodations.getAllAccomodations
  );
  return (
    <>
      <Section>
        <Container ref={getRef}>
          {allAccomodations.map((item, index) => {
            return <AccomodationItem key={item._id} item={item} />;
          })}
        </Container>
      </Section>
      <Link className="link" to="/market">
        <Button market="true" text="Go to Marketplace" arrowRight={darkRight} />
      </Link>
    </>
  );
};

export default AccomodationList;
