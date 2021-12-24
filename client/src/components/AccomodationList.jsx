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
  display: flex;
  margin-left: 5rem;
  margin-bottom: 41px;
  ${mobile({
    marginLeft: 0,
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
];

const AccomodationList = () => {
  const allAccomodations = useSelector(
    (state) => state.accomodations.getAllAccomodations
  );
  console.log(allAccomodations);
  return (
    <>
      <Section>
        {allAccomodations.map((item) => (
          <AccomodationItem key={item._id} item={item} />
        ))}
      </Section>
      <Link className="link" to="/market">
        <Button market="true" text="Go to Marketplace" arrowRight={darkRight} />
      </Link>
    </>
  );
};

export default AccomodationList;
