import styled from "styled-components";
import logo from "../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Close } from "@mui/icons-material";
import { openNav } from "../redux/navSlice";
import WindowSize from "../hooks/windowSize";
import axios from "axios";
import { toast } from "react-toastify";

const Section = styled.section`
  width: 350px;
  background: white;
  visibility: ${(props) =>
    props.size > 1045
      ? null
      : props.open === true
      ? "visible"
      : props.open === false
      ? "hidden"
      : null};
  position: ${(props) => props.size < 1045 && "absolute"};
  transition: all 0.25s ease;
  transform: ${(props) =>
    props.size > 1045
      ? null
      : props.open === true
      ? "translateX(0%)"
      : props.open === false
      ? "translateX(-50%)"
      : null};
  opacity: ${(props) =>
    props.size > 1045
      ? null
      : props.open === true
      ? 1
      : props.open === false
      ? 0
      : null};
  z-index: 1;
`;
const Container = styled.div`
  padding: 2rem 2.5rem;
`;
const LogoImage = styled.img`
  width: 150px;
  margin-bottom: 66.91px;
`;

const SidebarNav = styled.nav``;
const NavItems = styled.ul`
  display: flex;
  flex-direction: column;
`;
const NavItem = styled.li`
  list-style: none;
  cursor: pointer;
  font-family: Lato;
  font-style: normal;
  font-weight: ${(props) => (props.active ? 800 : 500)};
  font-size: ${(props) => (props.active ? "18px" : "14px")};
  line-height: ${(props) => (props.active ? "22px" : "17px")};
  letter-spacing: ${(props) => props.active && "0.01em"};
  color: ${(props) => (props.active ? "#854BFF" : "#9A9A9A")};
  margin-bottom: 37px;
`;

const SidebarFoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  height: 100vh;
`;
const Span = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  color: #9b9b9b;
  margin-bottom: 4px;
`;
const SpanName = styled.h3`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  color: #854bff;
`;
const Logout = styled.div`
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  color: #9b9b9b;
  cursor: pointer;
  margin-top: 29.5px;
`;

const Sidebar = () => {
  const user = useSelector((state) => state.user.user);
  const size = WindowSize();
  const open = useSelector((state) => state.navbar.open);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openNav());
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (error) {
      return toast(error, { type: "error" });
    }
  };
  return (
    <Section size={size.width} open={open ? true : false}>
      {size.width < 1045 && (
        <Close
          onClick={handleClick}
          style={{
            position: "absolute",
            right: "1rem",
            fontSize: "2rem",
            top: "1rem",
            color: "#854bff",
            cursor: "pointer",
          }}
        />
      )}
      <Container>
        <Link to="/" className="link">
          <LogoImage src={logo} alt="logo" />
        </Link>

        <SidebarNav>
          <NavItems>
            <NavLink
              style={({ isActive }) => ({
                color: isActive && "#854BFF",
                fontWeight: "bold",
              })}
              to="/dashboard"
              className="link"
            >
              <NavItem>Dashboard</NavItem>
            </NavLink>

            <NavLink
              style={({ isActive }) => ({
                color: isActive && "#854BFF",
                fontWeight: "bold",
              })}
              to="/dashboard/manage"
              className="link"
            >
              <NavItem>Manage Accomodation</NavItem>
            </NavLink>

            <NavLink
              style={({ isActive }) => ({
                color: isActive && "#854BFF",
                fontWeight: "bold",
              })}
              to="/dashboard/account"
              className="link"
            >
              <NavItem>Account</NavItem>
            </NavLink>
          </NavItems>
        </SidebarNav>

        <SidebarFoot>
          <Span>Signed in as</Span>
          <SpanName>
            {user?.firstName} {user?.lastName}
          </SpanName>

          <Logout onClick={() => handleLogout()}>Logout</Logout>
        </SidebarFoot>
      </Container>
    </Section>
  );
};

export default Sidebar;
