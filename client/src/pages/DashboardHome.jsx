import { useState, useEffect } from "react";
import styled from "styled-components";
import { Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { openNav } from "../redux/navSlice";
import WindowSize from "../hooks/windowSize";
import { tablet, mobile } from "../responsive.js";
import deleteBtn from "../assets/fluent_delete-48-filled (1).png";
import { Backdrop, Box, Modal, Fade } from "@mui/material";
import useStorage from "../hooks/useStorage";
import ProgressBar from "../components/ProgressBar";
import { ToastContainer, toast } from "react-toastify";
import CreateAccomodation from "../components/CreateAccomodation";
import { auth, database } from "../config";
import firebase from "firebase";
import axios from "axios";
import TableComponent from "../components/TableComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 3,
  overflowY: "auto",
  height: "100%",
  borderRadius: "10px",
};

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
const Table = styled.table`
  width: 100%;
`;
const Tr = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 43px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #d7d7d7;
  border-radius: 3px;
  padding: 1rem;
  margin-bottom: 11px;
`;
const Td = styled.td``;
const RightEnd = styled.div`
  display: flex;
`;
const EditButton = styled.button`
  outline: none;
  cursor: pointer;
  width: 65px;
  height: 26px;
  background: #ffffff;
  border: 1px solid #854bff;
  border-radius: 3px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #854bff;
  margin-right: 15px;
`;
const DeleteButton = styled.button`
  outline: none;
  cursor: pointer;
  width: 36px;
  height: 26px;
  background: #ffeeee;
  border: 1px solid #fd4c61;
  border-radius: 3px;
`;
const LoadMoreButton = styled.button`
  outline: none;
  cursor: pointer;
  width: 370px;
  height: 39px;
  background: #ffffff;
  border: 2px solid #dedede;
  border-radius: 50px;
  margin: 0 auto;
  margin-top: 8px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #929292;
  display: flex;
  justify-content: center;
  align-items: center;

  ${mobile({
    width: "100%",
  })};
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
const CreateHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;
const CreateTitle = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.01em;
  color: #854bff;
`;
const CreateBody = styled.div``;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const FormController = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 25px;
`;
const FormLabel = styled.label`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #8f8f8f;
  margin-bottom: 6px;
`;
const FormInput = styled.input`
  outline: none;
  min-width: 693px;
  flex: 1;
  height: 49px;
  background: #fcfcfc;
  border: 1px solid #f9f9f9;
  border-radius: 5px;
  padding: 1rem;
  ${tablet({
    minWidth: "100%",
  })};

  &::placeholder {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #d5d5d5;
  }
`;
const FormTextarea = styled.textarea`
width: 693px;
height: 153px;#FCFCFC;
border: 1px solid #F9F9F9;
border-radius: 5px;
padding: 1rem;
outline: none;
${tablet({
  width: "100%",
})};
`;
const FormSubLabel = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 12px;
  color: #a8a8a8;
`;
const FormButton = styled.button`
  outline: none;
  cursor: pointer;
  width: 693px;
  height: 39px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #854bff;
  border-radius: 5px;
  margin-top: 48px;
  border: none;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;

  ${tablet({
    width: "100%",
  })};
`;

const FormImageClick = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;
const FormImage = styled.input``;

const DashboadHome = () => {
  const accomodations = useSelector(
    (state) => state.accomodations.getAllAccomodations
  );
  const [userUid, setUserUid] = useState(null);
  const [key, setKey] = useState("");
  const [editID, setEditID] = useState("");
  const [deleteID, setDeleteID] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [renewal, setRenewal] = useState("");
  const [file, setFile] = useState(null);
  const [authState, setAuthState] = useState("");
  const [data, setData] = useState([]);
  console.log(data);

  const token = useSelector((state) => state.user.user.token);
  const { url, progress } = useStorage(file);
  const size = WindowSize();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openNav());
  };
  const types = ["image/png", "image/jpeg"];

  const showCreate = () => {
    handleOpen();
  };

  useEffect(() => {
    const getAllAccomodations = async () => {
      const response = await axios.get("/api/accomodations");
      setData(response.data.message);
    };
    getAllAccomodations();
  }, []);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(function (user) {
  //     if (!user) {
  //       setAuthState(false);
  //     } else {
  //       setAuthState(true);
  //       setUserUid(user.uid);
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   const getKeyValue = async () => {
  //     await database.ref("accomodations/" + userUid).on("value", (snapshot) => {
  //       snapshot.forEach((childSnapshot) => {
  //         var childKey = childSnapshot.key;
  //         setKey(childKey.toString());
  //         console.log(childKey.toString());
  //       });
  //     });
  //   };
  //   getKeyValue();
  // }, []);

  // Delete Single Accomodation here

  // const deleteSingleAccomodation = async (id) => {
  //   if (id) {
  //     await database.ref(`accomodations/${userUid}`).child(`${id}`).remove();
  //   }
  // };

  // const handleDelete = (id) => {
  //   if (id) {
  //     setDeleteID(id);
  //     deleteSingleAccomodation();
  //   }
  // };

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
            <CardNumber>{accomodations?.length}</CardNumber>
            <CardButtonContainer>
              <CardButton>Create New</CardButton>
            </CardButtonContainer>
          </Card>

          <Card>
            <CardTitle>TOTAL ENGAGEMENTS</CardTitle>
            <CardNumber>15,140</CardNumber>
          </Card>

          <Card>
            <CardTitle>TOTAL AGENTS</CardTitle>
            <CardNumber>100</CardNumber>
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
