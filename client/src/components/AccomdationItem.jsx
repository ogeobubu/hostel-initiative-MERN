import styled from "styled-components";
import { Link } from "react-router-dom";
import location from "../assets/location.png";
import Button from "./Button";
import { mobile } from "../responsive.js";

const Item = styled.div`
  min-width: 347px;
  background: #ffffff;
  border: 1px solid #d7d7d7;
  border-radius: 3px;
  flex: ${(props) => (props.market === true ? 0 : 1)};
  margin-right: 35px;
  margin-bottom: ${(props) => props.market === true && "1.5rem"};
  ${mobile({
    minWidth: "100%",
  })};
  ${mobile({
    marginRight: (props) => props.market === true && 0,
  })};
`;
const Image = styled.img`
  margin-right: ${(props) => props.location && "5px"};
  width: ${(props) => (props.location ? null : "100%")};
`;
const Container = styled.div`
  padding: 14px 19px;
`;
const Title = styled.h4`
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 179%;
  color: #3a3b7b;
  margin-bottom: 5px;
`;
const Location = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 29px;
`;
const Area = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #7a7a7a;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
const Price = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.02em;
  color: #7c7c7c;
`;
const Span = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 800;
  font-size: 7px;
  line-height: 8px;
  color: #854bff;
`;

const AccomodationItem = ({ item, market }) => {
  return (
    <Item market={market ? true : false}>
      <Image src={item.image} alt="image" />
      <Container>
        <Title>{item.title}</Title>
        <Location>
          <Image location src={location} alt="location" />
          <Area>{item.location}</Area>
        </Location>
        <Flex>
          <Price>
            NGN{item.price} <Span>/yr</Span>
          </Price>
          <Link className="link" to="/product">
            <Button text="View" item="true" />
          </Link>
        </Flex>
      </Container>
    </Item>
  );
};

export default AccomodationItem;
