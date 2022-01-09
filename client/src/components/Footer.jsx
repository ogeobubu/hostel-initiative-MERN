import styled from "styled-components";
import logo1 from "../assets/logo1.png";
import Button from "./Button";
import { aboutResponsive, tablet } from "../responsive.js";
import { Link } from "react-router-dom";

const Section = styled.footer`
  margin-top: 100px;
  background: #3a3b7b;
  padding-top: 2rem;
`;
const Container = styled.div`
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  ${tablet({
    flexDirection: "column",
    padding: "2rem",
  })};
`;
const Left = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-right: 198px;
  ${aboutResponsive({
    marginRight: "2rem",
    flexDirection: "column",
  })}
`;
const Product = styled.div`
  display: flex;
  flex-direction: column;
`;
const Tag = styled.h5`
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 188.5%;
  color: #ffffff;
  margin-bottom: 7px;
`;
const Span = styled.span`
  cursor: pointer;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 188.5%;
  color: #ffffff;
  margin-bottom: 15px;
`;
const Company = styled.div`
  display: flex;
  flex-direction: column;
  ${aboutResponsive({
    margin: "1.5rem 0",
  })}
`;
const Other = styled.div`
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
`;
const News = styled.h4`
  font-family: Lora;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 188.5%;
  color: #ffffff;
  margin-bottom: 10px;
  ${tablet({
    textAlign: "center",
  })}
`;
const Input = styled.input`
  outline: none;
  width: 400px;
  height: 66px;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.11);
  border: 1px solid #ffffff;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 188.5%;
  color: rgba(255, 255, 255, 0.57);

  &::placeholder {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 188.5%;
    color: rgba(255, 255, 255, 0.57);
  }

  ${tablet({
    width: "100%",
  })}
`;
const Bottom = styled.div``;
const Copy = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 224.5%;
  color: #ffffff;
`;
const Image = styled.img`
  height: 100%;
  ${tablet({
    width: "50%",
  })}
`;

const Footer = () => {
  return (
    <Section>
      <Container>
        <Left>
          <Product>
            <Tag>Products</Tag>
            <Link className="link" to="/market">
              <Span>Marketplace</Span>
            </Link>
            <Span>Become an Agent</Span>
          </Product>
          <Company>
            <Tag>Company</Tag>
            <Link className="link" to="/about">
              <Span>About us</Span>
            </Link>
            <Link className="link" to="/contact">
              <Span>Contact us</Span>
            </Link>
          </Company>
          <Other>
            <Span>Privacy Policy</Span>
            <Span>Terms of service</Span>
            <Link className="link" to="/faq">
              <Span>FAQs</Span>
            </Link>
          </Other>
        </Left>
        <Right>
          <News>Our Newsletter</News>
          <Input placeholder="Email Address" />
          <Button main="true" text="Subscribe to newsletter" footer="true" />
        </Right>
      </Container>

      <hr />
      <Bottom>
        <Container>
          <Image src={logo1} alt="logo" />
          <Copy>Copyright HostelInitiative 2021</Copy>
        </Container>
      </Bottom>
    </Section>
  );
};

export default Footer;
