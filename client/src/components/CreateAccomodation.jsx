import { useState, useEffect } from "react";
import styled from "styled-components";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  dispatchAllAccomodations,
  dispatchAccomodations,
  dispatchUserAllAccomodations,
} from "../redux/accomodationsSlice";
import { tablet } from "../responsive.js";
import ProgressBar from "../components/ProgressBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useStorage from "../hooks/useStorage";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Spinner from "./Spinner";

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

const Select = styled.select`
outline: none;
  min-width: 693px;
  flex: 1;
  height: 49px;
  background: #fcfcfc;
  border: 1px solid #f9f9f9;
  border-radius: 5px;
  padding: 1rem;
  color: #d5d5d5;

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
const Option = styled.option`
color: #d5d5d5;

`;

const CreateAccomodation = ({ onClose, titleCreate, editID }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const userAccomodations = useSelector(
    (state) => state.accomodations.getAllUserAccomodations
  );
  const accomodations = useSelector(
    (state) => state.accomodations.getAllAccomodations
  );
  const accomodation = useSelector(
    (state) => state.accomodations.accomodations
  );
  const user = useSelector((state) => state.user.user);
  const types = ["image/png", "image/jpeg"];
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [renewal, setRenewal] = useState("");
  const [files, setFiles] = useState([]);

  const { urls, success, setSuccess } = useStorage(files);

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
  }, [editID, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editID) {
      try {
        setLoading(true);
        await axios.patch(
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
              ? [features]
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
        setLoading(false);
        onClose();
      } catch (error) {
        setLoading(true);
        toast(error.response?.data?.message, { type: "error" });
        setLoading(false);
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

          if (Object.keys(urls).length === 0) {
            return toast(
              "Image cannot be empty. Kindly ensure you have at least one photo successfully uploaded.",
              { type: "error" }
            );
          }
          setLoading(true);
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
            dispatchUserAllAccomodations([
              response.data.message,
              ...userAccomodations,
            ])
          );
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
          setLoading(false);
          onClose();
        }
      } catch (error) {
        setLoading(true);
        return toast(error.response?.data?.message, { type: "error" });
        setLoading(false);
      }
    }
  };

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
                editID
                  ? accomodation?.location
                  : "e.g 10, Asherifa Street, Ile-Ife, Osun State"
              }
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              defaultValue={editID && accomodation?.location}
            />
          </FormController>

          <FormController>
            <FormLabel>Price</FormLabel>
            <FormInput
              placeholder={editID ? accomodation?.price : "Price in naira"}
              type="number"
              onChange={(e) => setPrice(+e.target.value)}
              defaultValue={editID && accomodation?.price}
            />
          </FormController>

          <FormController>
            <FormLabel>Renewal Period</FormLabel>
            <Select
              placeholder={
                editID ? accomodation?.renewal : "e.g Single room at damico"
              }
              type="text"
              onChange={(e) => setRenewal(+e.target.value)}
              defaultValue={editID && accomodation?.renewal}
            >
              <Option value="0">Renewal</Option>
              <Option value="1">1 year</Option>
              <Option value="2">2 years</Option>
              <Option value="3">3 years</Option>
            </Select>
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
            <FormSubLabel>
              You can select and upload multiple photos.
            </FormSubLabel>
            <FormInput
              type="text"
              disabled={true}
              placeholder={success ? success : "No Image Uploaded Yet."}
            />
            <FormImageClick>
              <label
                style={{ cursor: "pointer", fontSize: "14px" }}
                htmlFor="fusk"
              >
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

          {loading ? (
            <Spinner />
          ) : (
            <FormButton type="submit">{titleCreate}</FormButton>
          )}
        </Form>
      </CreateBody>
    </>
  );
};

export default CreateAccomodation;
