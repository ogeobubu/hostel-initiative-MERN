import { useState, useEffect } from "react";
import styled from "styled-components";
import { Menu } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { openNav } from "../redux/navSlice";
import WindowSize from "../hooks/windowSize";
import axios from "axios";
import TableComponent from "../components/TableComponent";
import { dispatchUserAllAccomodations } from "../redux/accomodationsSlice.js";
import { Link } from "react-router-dom";
import FlutterWave from "../components/FlutterWave";

const Section = styled.section`
  padding: 2.0625rem 1.3125rem;
  overflow-x: hidden;
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h3`
  font-family: Lato;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.01em;
  color: #854bff;
`;
const TitleMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ViewShopButton = styled.button`
  cursor: pointer;
  border: none;
  width: 115px;
  height: 29px;
  background: #f7f7ff;
  border: 1px solid #3a3b7b;
  border-radius: 50px;
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 14px;
  color: #3a3b7b;
`;
const Cards = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 31px;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  padding: 27px 34px;
  margin-right: 21px;
  width: 309px;
  height: 166px;
  background: #ffffff;
  box-shadow: 5px 8px 23px rgba(234, 234, 234, 0.25);
  border-radius: 5px;
  flex: 1;
  margin-bottom 2rem;
`;
const CardTitle = styled.h6`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.07em;
  color: #854bff;
  margin-bottom: 18px;
`;
const CardNumber = styled.h5`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: 43px;
  color: #3a3b7b;
  margin-bottom: 19px;
`;
const CardButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
const CardButton = styled.button`
  cursor: pointer;
  border: none;
  width: 102px;
  height: 30px;
  background: #854bff;
  border-radius: 2px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #ffffff;
`;

const TableDiv = styled.div`
  
`;

const TableTitle = styled.h6`
  font-family: Lato;
  font-style: normal;
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  color: #a6a6a6;
  margin-bottom: 21px;
`;

const DashboadHome = () => {
  const [anotherUser, setAnotherUser] = useState(null);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const userAllAccomodations = useSelector(
    (state) => state.accomodations.getAllUserAccomodations
  );
  const [setOpen] = useState(false);
  const [data, setData] = useState([]);
  const size = WindowSize();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openNav());
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get("/api/users", {
        headers: {
          Authorization: token,
        },
      });
      setAnotherUser(response.data.message);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getAllAccomodations = async () => {
      const response = await axios.get("/api/accomodations");
      setData(response.data.message);
    };
    getAllAccomodations();
  }, []);

  useEffect(() => {
    const getAllUserAccomodations = async () => {
      const response = await axios.get(`/api/users/profile/${user._id}`);
      dispatch(dispatchUserAllAccomodations(response.data));
    };
    getAllUserAccomodations();
  }, [user._id, dispatch]);

  return (
    <>
      <Section>
        <Head>
          <TitleMenu>
            {size.width < 1045 && (
              <Menu
                style={{
                  cursor: "pointer",
                  fontSize: "2rem",
                  marginRight: "1rem",
                }}
                onClick={handleClick}
              />
            )}
            <Title>Dashboard</Title>
          </TitleMenu>

          <ViewShopButton>View Shop</ViewShopButton>
        </Head>

        <Cards>
          <Card>
            <CardTitle>TOTAL ACCOMODATIONS</CardTitle>
            <CardNumber>{userAllAccomodations?.length}</CardNumber>
            <CardButtonContainer>
              {anotherUser?.isVerified ? (
                <Link className="link" to="/dashboard/manage">
                  <CardButton>Create New</CardButton>
                </Link>
              ) : (
                <FlutterWave user={user} token={token} />
              )}
            </CardButtonContainer>
          </Card>

          <Card>
            <CardTitle>TOTAL ENGAGEMENTS</CardTitle>
            <CardNumber>12</CardNumber>
          </Card>

          <Card>
            <CardTitle>TOTAL AGENTS</CardTitle>
            <CardNumber>189</CardNumber>
          </Card>
        </Cards>

        <TableDiv>
          <TableTitle>Recent Accomodations</TableTitle>
          <TableComponent data={data} />
        </TableDiv>
      </Section>
    </>
  );
};

export default DashboadHome;
