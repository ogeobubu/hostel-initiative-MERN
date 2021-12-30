import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { aboutResponsive, tablet } from "../responsive.js";
import { motion } from "framer-motion";

const HeaderSection = styled.header`
  position: relative;
  z-index: 2;
  overflow-x: hidden;
`;
const Container = styled.div`
  padding: 2rem 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${aboutResponsive({
    padding: "2rem 4rem",
  })};
  ${tablet({
    padding: "2rem",
  })};
`;
const Logo = styled.img``;
const Nav = styled.nav`
  ${tablet({
    display: "none",
  })}
`;
const NavList = styled.ul`
  list-style-type: none;
  display: flex;
`;
const NavItem = styled.li`
  font-family: Lato;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: #3a3b7b;
  margin-right: 34px;
  cursor: pointer;
`;
// const MobileNav = styled.div`
//   display: none;
//   ${tablet({
//     display: "block",
//   })}
// `;

const navData = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Marketplace",
    link: "/market",
  },
  {
    id: 3,
    name: "About us",
    link: "/",
  },
  {
    id: 4,
    name: "Contact us",
    link: "/",
  },
];

const Header = () => {
  return (
    <motion.div
      initial={{ x: "-50px", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ y: "-50px", opacity: 0 }}
    >
      <HeaderSection>
        <Container>
          <Link to="/" className="link">
            <Logo src={logo} alt="logo" />
          </Link>
          <Nav>
            <NavList>
              {navData.map(({ id, name, link }) => (
                <Link key={id} className="link" to={link}>
                  <NavItem>{name}</NavItem>
                </Link>
              ))}
            </NavList>
          </Nav>
        </Container>
      </HeaderSection>
    </motion.div>
  );
};

export default Header;
