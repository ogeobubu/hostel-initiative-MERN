import { useState, useEffect } from "react";
import styled from "styled-components";
import { Backdrop, Box, Modal, Fade } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { openNav } from "../redux/navSlice";
import WindowSize from "../hooks/windowSize";
import { tablet, mobile } from "../responsive.js";
import ProgressBar from "../components/ProgressBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStorage from "../hooks/useStorage";
import firebase from "firebase";
import { auth, database } from "../config";
import CreateAccomodation from "../components/CreateAccomodation";
import TableComponent from "../components/TableComponent";
import axios from "axios";
import {
  dispatchAllAccomodations,
  dispatchAccomodations,
} from "../redux/accomodationsSlice";

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

const SearchInput = styled.input`
  width: 100%;
  height: 43px;
  background: #ffffff;
  border: 2px solid #f1f1f1;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 1rem 2rem;
  outline: none;
  margin-top: 14px;
  margin-bottom: 29px;
`;

const CreateButton = styled.button`
  cursor: pointer;
  border: none;
  width: 124px;
  height: 39px;
  background: #854bff;
  border-radius: 5px;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: #ffffff;
`;
const TitleMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Search = () => {
  return (
    <>
      <SearchInput type="text" placeholder="Search" />
    </>
  );
};

const Manage = () => {
  const token = useSelector((state) => state.user.token);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const size = WindowSize();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openNav());
  };
  const [data, setData] = useState([]);

  const [title, setTitle] = useState("");
  console.log(title);
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState("");
  const [renewal, setRenewal] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [file, setFile] = useState(null);
  const { url, progress } = useStorage(file);
  const accomodations = useSelector(
    (state) => state.accomodations.getAllAccomodations
  );

  // useEffect(() => {
  //   try {
  //     const getAccomodation = async () => {
  //       const response = await axios.get(`/api/accomodations/${editID}`);
  //       dispatch(dispatchAccomodations(response.data.message));
  //     };
  //     getAccomodation();
  //   } catch (error) {
  //     toast(error.response.data.message, { type: "error" });
  //   }
  // }, [editID]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     if (
  //       (title === "" || address === "" || price === "" || renewal === "",
  //       description === "",
  //       features === "",
  //       url === null)
  //     ) {
  //       toast("All fields are required!", { type: "error" });
  //     } else {
  //       const createAccomodationData = {
  //         title,
  //         location: address,
  //         price,
  //         renewal,
  //         description,
  //         features,
  //         image: url,
  //       };

  //       const response = await axios.post(
  //         "/api/accomodations/create",
  //         createAccomodationData,
  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         }
  //       );
  //       toast("You have successfully created a new accomodation.", {
  //         type: "success",
  //       });
  //       dispatch(
  //         dispatchAllAccomodations([response.data.message, ...accomodations])
  //       );
  //       handleClose();
  //     }
  //   } catch (error) {
  //     return toast(error.response?.data?.message, { type: "error" });
  //   }
  // };

  return (
    <>
      <Section>
        <ToastContainer />

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
            <Title>Manage Accomodation</Title>
          </TitleMenu>
          <CreateButton onClick={handleOpen}>Create New</CreateButton>
        </Head>

        <Search />

        <TableComponent data={data} />
      </Section>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              ...style,
              width: size.width > 800 ? 800 : size.width,
            }}
          >
            <CreateAccomodation
              titleCreate="Create Accomodation"
              onClose={handleClose}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default Manage;
