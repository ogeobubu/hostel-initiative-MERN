import styled from "styled-components";
import { Link } from "react-router-dom";
import Navbar from "../components/Header";

const Section = styled.section`
display: flex;
justify-content: center;
align-items: center;
height: 90vh;
`;
const Text = styled.span`
font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 45px;
  color: #8f8f8f;
  margin-bottom: 6px;
`;

const NoPageFound = () => {
  return (
    <>
      <Navbar />
      <Section>
        <Text>
          404 Error: This page is not found. Go back to{" "}
          {<Link to="/">homepage</Link>}
        </Text>
      </Section>
    </>
  );
};

export default NoPageFound;
