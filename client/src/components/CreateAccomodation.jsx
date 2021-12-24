import { useState, useEffect } from "react";
import styled from "styled-components";
import { Backdrop, Box, Modal, Fade } from "@mui/material";
import deleteBtn from "../assets/fluent_delete-48-filled (1).png";
import { Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { openNav } from "../redux/navSlice";
import {
  dispatchAllAccomodations,
  dispatchAccomodations,
} from "../redux/accomodationsSlice";
import WindowSize from "../hooks/windowSize";
import { tablet, mobile } from "../responsive.js";
import ProgressBar from "../components/ProgressBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStorage from "../hooks/useStorage";
import firebase from "firebase";
import { auth, database } from "../config";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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
width: 100%;
height: 153px;
background-color: #FCFCFC;
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
  display: ${(props) => (props.success === true ? "none" : "flex")};
  justify-content: flex-end;
  margin-top: 1rem;
`;
const FormImage = styled.input``;

const CreateAccomodation = ({ onClose, titleCreate, editID }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const accomodations = useSelector(
    (state) => state.accomodations.getAllAccomodations
  );
  const accomodation = useSelector(
    (state) => state.accomodations.accomodations
  );
  const user = useSelector((state) => state.user.user);
  const types = ["image/png", "image/jpeg"];
  const [key, setKey] = useState("");
  //form submission
  const [userUid, setUserUid] = useState(null);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [renewal, setRenewal] = useState("");
  const [files, setFiles] = useState([]);
  const [authState, setAuthState] = useState("");

  const { urls, progress, success, error, setSuccess } = useStorage(files);

  console.log(urls, success);

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
  // // Write edit logic here
  // // Get Single Accomodation here
  // useEffect(() => {
  //   const getSingleAccomodation = async () => {
  //     if (userUid) {
  //       await database
  //         .ref()
  //         .child("accomodations")
  //         .child(userUid)
  //         .get()
  //         .then((snapshot) => {
  //           if (snapshot.exists()) {
  //             let returnArr = [];
  //             const test = [editID];
  //             snapshot.forEach((childSnapshot) => {
  //               let item = childSnapshot.val();
  //               item.key = childSnapshot.key;
  //               returnArr.push(item);
  //             });
  //             setAccomodation(returnArr.filter((m) => test.includes(m.id)));
  //           } else {
  //             console.log("No data available");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //     }
  //   };
  //   getSingleAccomodation();
  // }, [userUid]);

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

  // NEWWWWWWW COMMMMMMMEEEEEENNNNNNNNTTT--------------------------------------------------------

  useEffect(() => {
    try {
      const getAccomodation = async () => {
        const response = await axios.get(`/api/accomodations/${editID}`);
        dispatch(dispatchAccomodations(response.data.message));
      };
      getAccomodation();
    } catch (error) {
      toast(error.response.data.message, { type: "error" });
    }
  }, [editID]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editID) {
      try {
        const response = await axios.patch(
          `/api/accomodations/${editID}`,
          {
            ...accomodation,
            userId: user._id,
            title: title ? title : accomodation.title,
            location: address ? address : accomodation.location,
            price: price ? price : accomodation.price,
            renewal: renewal ? renewal : accomodation.renewal,
            description: description ? description : accomodation.description,
            features: features
              ? features
              : accomodation.features?.map((feature) => {
                  return feature.split(",");
                }),
            image: urls
              ? urls
              : accomodation.images?.map((image) => {
                  return [image];
                }),
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        toast("You have successfully edited this accomodation.", {
          type: "success",
        });
        dispatch(
          dispatchAccomodations({
            ...accomodation,
            userId: user._id,
            title: title ? title : accomodation.title,
            location: address ? address : accomodation.location,
            price: price ? price : accomodation.price,
            renewal: renewal ? renewal : accomodation.renewal,
            description: description ? description : accomodation.description,
            features: features ? features : accomodation.features,
            images: urls ? urls : accomodation.images?.map((image) => image),
          })
        );
        onClose();
      } catch (error) {
        return toast(error.response?.data?.message, { type: "error" });
      }
    } else {
      try {
        if (
          title === "" ||
          address === "" ||
          price === "" ||
          renewal === "" ||
          description === "" ||
          features === "" ||
          urls === null
        ) {
          toast("All fields are required!", { type: "error" });
        } else {
          const createAccomodationData = {
            userId: user._id,
            title,
            location: address,
            price,
            renewal,
            description,
            features: features.split(","),
            images: urls,
          };

          const response = await axios.post(
            "/api/accomodations/create",
            createAccomodationData,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          toast("You have successfully created a new accomodation.", {
            type: "success",
          });
          dispatch(
            dispatchAllAccomodations([response.data.message, ...accomodations])
          );
          setTitle("");
          setAddress("");
          setPrice("");
          setRenewal("");
          setDescription("");
          setFeatures("");
          setFiles("");
          setSuccess("");
          onClose();
        }
      } catch (error) {
        return toast(error.response?.data?.message, { type: "error" });
      }
    }
  };

  // if (editID) {
  //   // Edit logic
  //   const updateAccomodation = {};

  //   var postData = {
  //     title,
  //     address,
  //     price,
  //     renewal,
  //     description,
  //     features,
  //     image: url,
  //   };

  //   await database.ref().child(`accomodations/${userUid}/${key}`);

  //   var updates = {};
  //   updates[`accomodations/${userUid}/${key}`] = {
  //     postData,
  //     ...accomodation[0],
  //   };

  //   await database.ref().update(updates);

  //   toast("You have successfully edited this accomodation", {
  //     type: "success",
  //   });
  // } else {
  //   if (
  //     (title === "" || address === "" || price === "" || renewal === "",
  //     description === "",
  //     features === "",
  //     url === null)
  //   ) {
  //     toast("All fields are required!", { type: "error" });
  //   } else {
  //     const createAccomodationData = {
  //       id: uuidv4(),
  //       title,
  //       address,
  //       price,
  //       renewal,
  //       description,
  //       features,
  //       image: url,
  //     };
  //     await database
  //       .ref("accomodations/" + userUid)
  //       .push()
  //       .set(createAccomodationData);
  //     toast("You have successfully created a new accomodation", {
  //       type: "success",
  //     });
  //   }
  // }
  return (
    <>
      <CreateHead>
        <CreateTitle>{titleCreate}</CreateTitle>
        <Close
          onClick={() => onClose()}
          style={{ color: "#000", cursor: "pointer" }}
        />
      </CreateHead>
      <CreateBody>
        <Form onSubmit={handleSubmit}>
          <FormController>
            <FormLabel>Title</FormLabel>
            <FormInput
              placeholder={
                editID ? accomodation?.title : "e.g Single room at damico"
              }
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={editID && accomodation?.title}
            />
          </FormController>

          <FormController>
            <FormLabel>Address</FormLabel>
            <FormInput
              placeholder={
                editID ? accomodation?.location : "e.g Single room at damico"
              }
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              defaultValue={editID && accomodation?.location}
            />
          </FormController>

          <FormController>
            <FormLabel>Price</FormLabel>
            <FormInput
              placeholder={
                editID ? accomodation?.price : "e.g Single room at damico"
              }
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              defaultValue={editID && accomodation?.price}
            />
          </FormController>

          <FormController>
            <FormLabel>Renewal Period</FormLabel>
            <FormInput
              placeholder={
                editID ? accomodation?.renewal : "e.g Single room at damico"
              }
              type="text"
              onChange={(e) => setRenewal(e.target.value)}
              defaultValue={editID && accomodation?.renewal}
            />
          </FormController>

          <FormController>
            <FormLabel>Description</FormLabel>
            <FormInput
              type="text"
              placeholder={
                editID
                  ? accomodation?.description
                  : "Write a description of the accomodation"
              }
              onChange={(e) => setDescription(e.target.value)}
              defaultValue={editID && accomodation?.description}
            />
          </FormController>

          <FormController>
            <FormLabel>Features</FormLabel>
            <FormSubLabel>
              Separate multiple features by a comma e.g (Electricity, Parking
              Space, Running Water){" "}
            </FormSubLabel>
            <FormInput
              placeholder={
                editID
                  ? accomodation?.features
                  : "e.g water supply, internet connection, 24/7 electricity"
              }
              type="text"
              onChange={(e) => setFeatures(e.target.value)}
            />
          </FormController>

          <FormController>
            <FormLabel>Images</FormLabel>
            <FormInput
              placeholder={Object.keys(files).length !== 0 && success}
              type="text"
              disabled={true}
            />
            <FormImageClick>
              <label style={{ cursor: "pointer", fontSize: "14px" }} for="fusk">
                + Add Photo
              </label>
              <FormImage
                style={{ display: "none" }}
                multiple
                id="fusk"
                type="file"
                className="custom-file-input"
                onChange={(e) => {
                  for (let i = 0; i < e.target.files.length; i++) {
                    let selected = e.target.files[i];
                    selected["id"] = uuidv4();
                    if (selected && types.includes(selected.type)) {
                      setFiles((previousState) => [...previousState, selected]);
                    } else {
                      setFiles(null);
                      toast(
                        "Oops! You can only select image(s) with the type 'png' or 'jpeg'",
                        { type: "error" }
                      );
                    }
                  }
                }}
              />
            </FormImageClick>
            {files && <ProgressBar files={files} setFiles={setFiles} />}
          </FormController>

          <FormButton type="submit">{titleCreate}</FormButton>
        </Form>
      </CreateBody>
    </>
  );
};

export default CreateAccomodation;
