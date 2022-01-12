import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import Manage from "./Manage";
import Account from "./Account";
import DashboardHome from "./DashboardHome";
import { Routes, Route } from "react-router-dom";
import { dispatchUserToken } from "../redux/userSlice";
import { dispatchAllAccomodations } from "../redux/accomodationsSlice";
import { useDispatch, useSelector } from "react-redux";
import Signin from "../pages/Signin";
import axios from "axios";
const Section = styled.section`
  background: #fcfcfc;
`;

const Flex = styled.div`
  display: flex;
`;
const Right = styled.div`
  width: 100%;
`;

const Dashboard = () => {
  const [anotherUser, setAnotherUser] = useState(null);
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.user.isLogged);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      try {
        const getToken = async () => {
          const response = await axios.get("/api/users/refresh_token");
          console.log(response.data);
          dispatch(dispatchUserToken(response.data.access_token));
        };
        getToken();
      } catch (error) {}
    }
  }, [dispatch]);

  useEffect(() => {
    const getAllAccomodations = async () => {
      try {
        const response = await axios.get("/api/accomodations");
        dispatch(dispatchAllAccomodations(response.data.message));
      } catch (error) {}
    };
    getAllAccomodations();
  }, [dispatch]);

  return (
    <Section>
      <Flex>
        <Sidebar />
        <Right>
          <Routes>
            <Route
              path="/"
              element={isLogged === true ? <DashboardHome /> : <Signin />}
            />
            <Route
              path="/manage"
              element={isLogged === true ? <Manage user={user} /> : <Signin />}
            />
            <Route
              path="/account"
              element={isLogged === true ? <Account /> : <Signin />}
            />
          </Routes>
        </Right>
      </Flex>
    </Section>
  );
};

export default Dashboard;
