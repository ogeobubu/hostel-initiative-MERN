import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import styled from "styled-components";
import { aboutResponsive, tablet, largeTablet, mobile } from "../responsive.js";
import location from "../assets/location.png";
import building from "../assets/building.png";
import me from "../assets/me.png";
import recent from "../assets/recent.png";
import photo1 from "../assets/photo1.png";
import photo2 from "../assets/photo2.png";
import photo3 from "../assets/photo3.png";
import photo4 from "../assets/photo4.png";
import photo5 from "../assets/photo5.png";
import photo6 from "../assets/photo6.png";
import whatsapp from "../assets/whatsapp.png";
import gmail from "../assets/gmail.png";
import Footer from "./Footer";
import Accomodation from "./Accomodation";
import axios from "axios";

const data = [
  {
    id: 1,
    image: photo1,
  },
  {
    id: 2,
    image: photo2,
  },
  {
    id: 3,
    image: photo3,
  },
  {
    id: 4,
    image: photo4,
  },
  {
    id: 5,
    image: photo5,
  },
  {
    id: 6,
    image: photo6,
  },
];

const Section = styled.section`
  margin-top: 60px;
`;
const Container = styled.div`
  padding: 2rem 6rem;

  ${aboutResponsive({
    flexDirection: "column",
    padding: "2rem 4rem",
  })};

  ${tablet({
    padding: "2rem",
  })};
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${largeTablet({
    flexDirection: "column",
    alignItems: "flex-start",
  })};
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  font-family: Lora;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 153.5%;
  color: #854bff;
  margin-bottom: 6px;
`;
const Location = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  color: #7a7a7a;
  display: flex;
`;
const Image = styled.img`
  margin-right: 23.29px;
  object-fit: contain;
`;
const Right = styled.div`
  display: flex;
  flex-direction: column;
  ${largeTablet({
    marginTop: "2rem",
  })};
`;
const Flex = styled.div`
  display: flex;
`;
const Price = styled.h5`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
  line-height: 36px;
  letter-spacing: 0.02em;
  color: #3a3b7b;
  margin-bottom: 19px;
`;
const Span = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  color: #854bff;
`;
const Date = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: #7a7a7a;
`;

const Photos = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 10px;
  align-items: start;
  justify-items: center;
  margin: auto;
  width: 100%;
  margin-top: 37px;
  margin-bottom: 61px;
`;
const Photo = styled.img`
  border: 1px solid rgba(0, 0, 0, 0.3);
  box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.3);
  max-width: 100%;

  &:nth-child(1) {
    grid-column: span 6;
    grid-row: span 2;
    align-self: stretch;
  }

  &:nth-child(2) {
    grid-column: span 4;
  }

  &:nth-child(3) {
    grid-column: span 4;
  }

  &:nth-child(4) {
    grid-column: span 2;
    grid-row: span 1;
  }

  &:nth-child(5) {
    grid-column: span 2;
  }

  &:nth-child(6) {
    grid-column: span 2;
  }
`;
const AccoHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({
    flexDirection: "column",
  })};
`;
const Div = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
`;
const Line = styled.div`
  width: 50px;
  height: 0px;
  border: 1px solid #854bff;
  transform: rotate(-90deg);
  margin-right: 14px;
  ${tablet({
    marginRight: 0,
  })};
`;
const De = styled.h5`
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 179%;
  color: #3a3b7b;
  margin-bottom: 16px;
  ${mobile({
    marginBottom: "1rem",
  })};
`;

const Text = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 224.5%;
  color: #7b7b7b;
  margin-bottom: 60px;
  margin-left: 5rem;
  ${tablet({
    width: "100%",
  })};
`;
const FlexLeft = styled.div`
  width: 60%;
  margin-right: 74px;
`;
const Col = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  ${aboutResponsive({
    marginBottom: "2rem",
  })};
  ${tablet({
    display: "flex",
    flexWrap: "wrap",
  })};
`;
const ColText = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #7b7b7b;
  margin-left: 5rem;
`;
const Me = styled.div`
  display: flex;
  align-items: center;
`;
const FlexRight = styled.div`
  padding: 1rem;
  width: 424px;
  height: 100%;
  background: #ffffff;
  border: 2px solid #ebebeb;
  ${mobile({
    width: "100%",
  })};
`;
const Main = styled.h4`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 179%;
  color: #3a3b7b;
  margin-bottom: 22px;
  ${mobile({
    textAlign: "center",
  })};
`;
const Profile = styled.div`
  display: flex;
  ${mobile({
    flexDirection: "column",
    alignItems: "center",
  })};
`;
const ImageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 80px;
height: 80px;
border-radius: 50%;
margin-right: 19px;
${mobile({
  marginRight: 0,
})};
`;
const ImageProfile = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
`;
const Bio = styled.div`
  display: flex;
  flex-direction: column;
`;
const Name = styled.h6`
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 153.5%;
  color: rgba(58, 59, 123, 0.97);
  margin-bottom: 4px;
  ${mobile({
    textAlign: "center",
  })};
`;
const Des = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 171.5%;
  color: #828282;
  margin-bottom: 35px;
`;
const Box = styled.div`
  width: 65px;
  height: 50px;
  background: #ffffff;
  border: 2px solid #dcdcdc;
  border-radius: 5px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImageSocial = styled.img``;
const FlexOne = styled.div`
  display: flex;
  ${aboutResponsive({
    flexDirection: "column",
  })};
`;
const FlexBox = styled.div`
  display: flex;
  ${mobile({
    justifyContent: "center",
  })};
`;

const ProductItem = () => {
  const { _id } = useParams();
  const [accomodation, setAccomodation] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getSingleAccomodation = async () => {
      const response = await axios.get(`/api/accomodations/${_id}`);
      setAccomodation(response.data.message);
    };
    getSingleAccomodation();
  }, [_id]);

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(`/api/users/${accomodation.userId}`);
      setUser(response.data.message);
    };
    getUser();
  }, [accomodation.userId]);

  return (
    <Section>
      <Container>
        <Head>
          <Left>
            <Title>{accomodation?.title}</Title>
            <Flex>
              <Image src={location} alt="location" />
              <Location>{accomodation?.location}</Location>
            </Flex>
          </Left>
          <Right>
            <Price>
              NGN{accomodation?.price}
              <Span>/yr</Span>
            </Price>
            <Flex>
              <Image src={recent} alt="recent" />
              <Date>{accomodation?.date}</Date>
            </Flex>
          </Right>
        </Head>

        <Photos>
          {accomodation?.images ? (
            accomodation?.images.map((image, index) => {
              return <Photo key={index} src={image} alt={index} />;
            })
          ) : (
            <Photo
              src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=784&q=80"
              alt="default image"
            />
          )}
        </Photos>

        <FlexOne>
          <FlexLeft>
            <AccoHead>
              <Div>
                <Me>
                  <Image src={building} alt="building" />
                  <Line />
                  <De>Description</De>
                </Me>
                <Text>{accomodation?.description}</Text>
              </Div>
            </AccoHead>

            <AccoHead>
              <Div>
                <Me>
                  <Image src={building} alt="building" />
                  <Line />
                  <De>Features</De>
                </Me>
                <Col>
                  {accomodation?.features &&
                    accomodation?.features.map((feature) => {
                      return <ColText>{feature}</ColText>;
                    })}
                </Col>
              </Div>
            </AccoHead>
          </FlexLeft>
          <FlexRight>
            <Main>Agent</Main>
            <Profile>
              <ImageContainer>
                <ImageProfile src={user?.profilePicture} alt="me" />
              </ImageContainer>
              <Bio>
                <Name>
                  {user?.firstName} {user?.lastName}
                </Name>
                <Des>
                  {user?.bio
                    ? user?.bio
                    : `Agent ${user?.firstName} doesn't have a bio for now.`}
                </Des>
                <FlexBox>
                  {user?.whatsapp && (
                    <Box>
                      <a
                        className="link"
                        href={`https://wa.me/${user?.whatsapp}/?text=GreetingsAgent${user?.firstName}`}
                      >
                        <ImageSocial src={whatsapp} alt="whatsapp" />
                      </a>
                    </Box>
                  )}

                  <Box>
                    <a className="link" href={`mailto:${user?.email}`}>
                      <ImageSocial src={gmail} alt="gmail" />
                    </a>
                  </Box>
                </FlexBox>
              </Bio>
            </Profile>
          </FlexRight>
        </FlexOne>
      </Container>
      <Accomodation text="Similar to this" similar="true" />
      <Footer />
    </Section>
  );
};

export default ProductItem;
