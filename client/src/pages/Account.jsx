import { useState} from "react";
import styled from "styled-components";
import { Edit, Menu } from "@mui/icons-material";
import { aboutResponsive, tablet, mobile, largeTablet } from "../responsive.js";
import { useDispatch } from "react-redux";
import { openNav } from "../redux/navSlice";
import WindowSize from "../hooks/windowSize";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Section = styled.section`
  padding: 2.0625rem 1.3125rem;
`;
const AccountHead = styled.div`
  background: linear-gradient(
    97.65deg,
    #3a3b7b -9.97%,
    #c13fff 17.71%,
    #854bff 66.42%
  );
`;
const AccountTitle = styled.h5`
  font-family: Lato;
  font-style: normal;
  font-weight: 800;
  font-size: 26px;
  line-height: 31px;
  letter-spacing: 0.01em;
  color: #ffffff;
  margin-bottom: 32px;
`;
const ProfileDetails = styled.div`
  display: flex;
  ${tablet({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  })};
`;
const ProfilePictureContainer = styled.div`
  width: 268px;
  height: 268px;
  border: 5px solid #ffffff;
  border-radius: 5px;
  margin-right: 33px;
  ${tablet({
    marginBottom: "2rem",
  })};
`;
const ProfilePicture = styled.img`
  width: 100%;
  box-shadow: 0px 4px 19px rgba(72, 72, 72, 0.25);
`;
const ProfileInfos = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 2rem;

  ${aboutResponsive({
    gridTemplateColumns: "repeat(1, 1fr)",
    gridGap: 0,
  })};
`;
const ProfileInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  ${tablet({
    marginBottom: "1rem",
  })};
`;
const ProfileInfoLabel = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: rgba(255, 255, 255, 0.58);
  margin-bottom: 6px;
`;
const ProfileInfo = styled.h6`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 29px;
  color: #ffffff;
`;
const UpdateTitle = styled.h4`
  margin-bottom: 13px;
  font-family: Lato;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.01em;
  color: #854bff;
`;
const UpdateTextarea = styled.textarea`
  padding: 1rem;
  width: 780px;
  height: 132px;
  background: #fcfcfc;
  border: 1px solid #f9f9f9;
  border-radius: 5px;
  margin-bottom: 22px;
  border: none;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 171.5%;
  color: #828282;

  ${largeTablet({
    width: "100%",
  })};
`;
const UpdateButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const UpdateButton = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  width: 189px;
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
const UpdateSection = styled.section`
  background: white;
`;
const TextareaButton = styled.div`
  width: fit-content;
  ${largeTablet({
    width: "100%",
  })};
`;
const ContactInfoSection = styled.div`
  background: #fcfcfc;
`;
const EditButton = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  width: 126px;
  height: 33px;
  background: #ffffff;
  border: 1px solid #854bff;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  color: #854bff;
`;
const InputController = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25.33px;

  ${mobile({
    flexDirection: "column",
    alignItems: "baseline",
    width: "100%",
  })};
`;
const InputLabel = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.01em;
  color: #ababab;
`;
const Input = styled.input`
  width: 412px;
  height: 50px;
  background: #ffffff;
  border: 2px solid #eeeeee;
  border-radius: 5px;
  outline: none;
  padding: 1rem;
  ${mobile({
    width: "100%",
  })};
`;
const InputEdit = styled.div`
  display: flex;
  flex-direction: column;
  ${mobile({
    width: "100%",
  })};
`;
const InputField = styled.div`
  width: 70%;
  ${largeTablet({
    width: "100%",
  })};
`;
const EditOne = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
`;

const PasswordSection = styled.section`
  background: #fff;
`;
const InputControllerPass = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  margin-top: 2.5rem;
`;

const Account = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  // const docs = useFirestore("users");
  // console.log(docs);
  const size = WindowSize();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(openNav());
  };
  const [edit, setEdit] = useState(null);
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleBioSubmit = async () => {
    const submit = {
      bio,
    };

    try {
      const response = await axios.patch("/api/users", submit, {
        headers: {
          Authorization: token,
        },
      });
      toast(response?.data?.message, { type: "success" });
    } catch (error) {
      toast(error.response?.data?.message, { type: "error" });
    }
  };

  const handleEditContact = async (param) => {
    if (param === "phone") {
      try {
        const response = await axios.patch(
          "/api/users",
          {
            phone,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        toast(response?.data?.message, { type: "success" });
      } catch (error) {
        toast(error.response?.data?.message, { type: "error" });
      }
    } else if (param === "whatsapp") {
      try {
        const response = await axios.patch(
          "/api/users",
          {
            whatsapp,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response.data);
        toast(response?.data?.message, { type: "success" });
      } catch (error) {
        toast(error.response?.data?.message, { type: "error" });
      }
    } else if (param === "email") {
      try {
        const response = await axios.patch(
          "/api/users",
          {
            email,
          },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response.data);
        toast(response?.data?.message, { type: "success" });
      } catch (error) {
        toast(error.response?.data?.message, { type: "error" });
      }
    }
  };

  const handlePassword = async () => {
    if (password !== confirmPassword) {
      return toast("Passwords do not match", { type: "error" });
    } else {
      const changePassword = {
        password,
      };
      try {
        const response = await axios.patch("/api/users", changePassword, {
          headers: {
            Authorization: token,
          },
        });
        toast(response?.data?.message, { type: "success" });
      } catch (error) {
        toast(error.response?.data?.message, { type: "error" });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <AccountHead>
        <Section>
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
          <AccountTitle>Account</AccountTitle>
          <ProfileDetails>
            <ProfilePictureContainer>
              <ProfilePicture src={user?.profilePicture} alt="profile" />
            </ProfilePictureContainer>
            <ProfileInfos>
              <ProfileInfoDiv>
                <ProfileInfoLabel>Full Name</ProfileInfoLabel>
                <ProfileInfo>
                  {user?.firstName} {user?.lastName}
                </ProfileInfo>
              </ProfileInfoDiv>

              <ProfileInfoDiv>
                <ProfileInfoLabel>Email Address</ProfileInfoLabel>
                <ProfileInfo>{user?.email}</ProfileInfo>
              </ProfileInfoDiv>

              <ProfileInfoDiv>
                <ProfileInfoLabel>Agency</ProfileInfoLabel>
                <ProfileInfo>{user?.agencyName}</ProfileInfo>
              </ProfileInfoDiv>

              <ProfileInfoDiv>
                <ProfileInfoLabel>Phone Number</ProfileInfoLabel>
                <ProfileInfo>{user?.phone}</ProfileInfo>
              </ProfileInfoDiv>

              <ProfileInfoDiv>
                <ProfileInfoLabel>Office Address</ProfileInfoLabel>
                <ProfileInfo>{user?.address}</ProfileInfo>
              </ProfileInfoDiv>
            </ProfileInfos>
          </ProfileDetails>
        </Section>
      </AccountHead>

      <UpdateSection>
        <Section>
          <UpdateTitle>Update Bio</UpdateTitle>
          <TextareaButton>
            <UpdateTextarea
              onChange={(e) => setBio(e.target.value)}
              defaultValue={user?.bio}
              placeholder="Agent for Heroku houses with the aim of housing as many ile-ife residents as possible. Like what you see, send me a message"
            />
            <UpdateButtonContainer>
              <UpdateButton onClick={() => handleBioSubmit()}>
                Save Changes
              </UpdateButton>
            </UpdateButtonContainer>
          </TextareaButton>
        </Section>
      </UpdateSection>

      <ContactInfoSection>
        <Section>
          <UpdateTitle>Contact Information</UpdateTitle>
          <InputField>
            <InputController>
              <InputLabel>Phone</InputLabel>
              <InputEdit>
                <Input
                  disabled={!edit === "phone" ? true : false}
                  defaultValue={user?.phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <EditOne onClick={() => setEdit("phone")}>
                  <Edit style={{ fontSize: "1rem" }} /> Edit
                </EditOne>
              </InputEdit>
              {edit === "phone" && (
                <EditButton onClick={() => handleEditContact("phone")}>
                  Save Changes
                </EditButton>
              )}
            </InputController>

            <InputController>
              <InputLabel>WhatsApp</InputLabel>
              <InputEdit>
                <Input
                  disabled={!edit === "whatsapp" ? true : false}
                  defaultValue={user?.whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
                <EditOne onClick={() => setEdit("whatsapp")}>
                  <Edit style={{ fontSize: "1rem" }} /> Edit
                </EditOne>
              </InputEdit>
              {edit === "whatsapp" && (
                <EditButton onClick={() => handleEditContact("whatsapp")}>
                  Save Changes
                </EditButton>
              )}
            </InputController>

            <InputController>
              <InputLabel>Email</InputLabel>
              <InputEdit>
                <Input
                  disabled={!edit === "email" ? true : false}
                  defaultValue={user?.email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <EditOne onClick={() => setEdit("email")}>
                  <Edit style={{ fontSize: "1rem" }} /> Edit
                </EditOne>
              </InputEdit>
              {edit === "email" && (
                <EditButton onClick={() => handleEditContact("email")}>
                  Save Changes
                </EditButton>
              )}
            </InputController>
          </InputField>
        </Section>
      </ContactInfoSection>

      <PasswordSection>
        <Section>
          <UpdateTitle>Change Password</UpdateTitle>
          {/*<InputControllerPass>
            <InputLabel>Current Password</InputLabel>
            <Input onChange={(e) => setPassword(e.target.value)} placeholder="***************" />
              </InputControllerPass>*/}

          <InputControllerPass>
            <InputLabel>New Password</InputLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="***************"
            />
          </InputControllerPass>

          <InputControllerPass>
            <InputLabel>Confirm Password</InputLabel>
            <Input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="***************"
            />
          </InputControllerPass>

          <UpdateButton onClick={() => handlePassword()}>
            Change Password
          </UpdateButton>
        </Section>
      </PasswordSection>
    </>
  );
};

export default Account;
