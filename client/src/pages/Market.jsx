import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { aboutResponsive, tablet, mobile } from "../responsive.js";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import AccomodationItem from "../components/AccomdationItem";

const SectionMarket = styled.section`
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 41px;
  justify-content: center;
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
  {
    id: 4,
    image: image3,
    name: "Single Room at Damico",
    location: "12, Harakiri, Damico Estate, Ile-ife",
    price: "80,000",
  },
  {
    id: 5,
    image: image2,
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
  {
    id: 7,
    image: image3,
    name: "Single Room at Damico",
    location: "12, Harakiri, Damico Estate, Ile-ife",
    price: "80,000",
  },
  {
    id: 8,
    image: image3,
    name: "Single Room at Damico",
    location: "12, Harakiri, Damico Estate, Ile-ife",
    price: "80,000",
  },
  {
    id: 9,
    image: image3,
    name: "Single Room at Damico",
    location: "12, Harakiri, Damico Estate, Ile-ife",
    price: "80,000",
  },
  {
    id: 10,
    image: image3,
    name: "Single Room at Damico",
    location: "12, Harakiri, Damico Estate, Ile-ife",
    price: "80,000",
  },
];

const Section = styled.section`
  margin-top: 40px;
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
const Head = styled.h2`
  font-family: Lora;
  font-style: normal;
  font-weight: bold;
  font-size: 36px;
  line-height: 153.5%;
  color: #854bff;
  margin-bottom: 7px;
  text-align: center;
`;
const Desc = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 224.5%;
  text-align: center;
  color: #7b7b7b;
  width: 100%;
  padding: 0 5rem;
  margin-bottom: 62px;
  ${mobile({
    padding: 0,
  })};
`;
const InputContainer = styled.div`
  display: flex;
  height: 60px;
  background: rgba(252, 252, 252, 0.67);
  border: 2px solid #f1f1f1;
  border-radius: 5px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;
const Input = styled.input`
  border: none;
  outline: none;
  padding: 1rem 2rem;
  background: transparent;
  width: 100%;
`;
const Button = styled.button`
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 144px;
  height: 53px;
  background: #854bff;
  border-radius: 5px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.08em;
  color: #ffffff;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 31px;
  flex-wrap: wrap;
`;
const Option = styled.div`
  margin-right: 28px;
  margin-bottom: 1.5rem;
`;
const InputOption = styled.input`
  width: 323px;
  height: 52px;
  background: #fdfdfd;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  padding: 1rem 2rem;
  ${mobile({
    width: "100%",
  })};
`;
const LoadButton = styled.button`
  cursor: pointer;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 170px;
  height: 49px;
  background: #ffffff;
  border: 2px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 9px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  color: #969696;
`;

const Market = () => {
  return (
    <>
      <Header />
      <Section>
        <Container>
          <Head>Marketplace</Head>
          <Desc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo
          </Desc>
          <InputContainer>
            <Input placeholder="Search" type="text" />
            <Button>Search</Button>
          </InputContainer>
          <Flex>
            <Option>
              <InputOption placeholder="Location" />
            </Option>
            <Option>
              <InputOption placeholder="Status" />
            </Option>
            <Option>
              <InputOption placeholder="Price range" />
            </Option>
          </Flex>

          <SectionMarket>
            {data.map((item) => (
              <AccomodationItem key={item.id} item={item} market="true" />
            ))}
          </SectionMarket>

          <LoadButton>Load More</LoadButton>
        </Container>
      </Section>
      <Footer />
    </>
  );
};

export default Market;
