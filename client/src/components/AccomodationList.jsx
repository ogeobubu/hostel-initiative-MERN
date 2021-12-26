import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AccomodationItem from "./AccomdationItem";
import Button from "./Button";
import darkRight from "../assets/darkRight.png";
import { mobile } from "../responsive.js";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
import NoData from "./NoData";

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

const AccomodationList = ({ current, showPage, getRef, similarData }) => {
  const [allAccomodations, setAllAccomodations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const getLatestAccomodation = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/accomodations?latest=true");
        setAllAccomodations(response.data.message);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        toast(error.response?.data?.message, { type: "error" });
        setLoading(false);
        setNoData(true);
      }
    };
    getLatestAccomodation();
  }, []);

  return (
    <>
      <Section>
        {loading ? (
          <Spinner />
        ) : (
          <Container ref={getRef}>
            {noData ? (
              <NoData />
            ) : similarData ? (
              similarData.map((item, index) => {
                return <AccomodationItem key={index} item={item} />;
              })
            ) : (
              allAccomodations.map((item, index) => {
                return <AccomodationItem key={index} item={item} />;
              })
            )}
          </Container>
        )}
      </Section>
      <Link className="link" to="/market">
        <Button market="true" text="Go to Marketplace" arrowRight={darkRight} />
      </Link>
    </>
  );
};

export default AccomodationList;
