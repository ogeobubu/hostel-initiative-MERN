import { useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { aboutResponsive, tablet, mobile } from "../responsive";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { dispatchIsLogged } from "../redux/userSlice.js";

const Section = styled.section``;

const Container = styled.div`
  padding: 2rem 6rem;
  display: flex;

  ${aboutResponsive({
    flexDirection: "column",
    padding: "2rem 4rem",
  })};

  ${tablet({
    padding: "2rem",
  })};
`;

const Left = styled.div`
  flex: 1;
  background: #854bff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  ${aboutResponsive({
    padding: "1.5rem",
  })};
`;
const Head = styled.h1`
  font-family: Lora;
  font-style: normal;
  font-weight: bold;
  font-size: 48px;
  line-height: 72px;
  color: #ffffff;
  margin-bottom: 25px;
  margin-top: 92px;
  margin-left: 67px;
  width: 50%;

  ${mobile({
    marginLeft: 0,
    marginTop: "35px",
    width: "100%",
    fontSize: "35px",
  })};
`;
const Desc = styled.p`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 32px;
  color: #ffffff;
  margin-bottom: 87px;
  margin-left: 67px;
  width: 60%;

  ${mobile({
    marginLeft: 0,
    width: "100%",
  })};
`;
const Span = styled.span`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 32px;
  color: #ffffff;
  margin-left: 67px;
  ${mobile({
    marginLeft: 0,
    width: "100%",
  })};

  ${tablet({
    marginBottom: "2rem",
  })};
`;
const Right = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 47px rgba(207, 207, 207, 0.29);
  border-radius: 20px;
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100vh;

  ${tablet({
    marginTop: "1rem",
  })};
`;
const RightContainer = styled.div`
  padding: 56px 62px;

  ${mobile({
    padding: "2rem 1.5rem",
  })};
`;

const Form = styled.form``;
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
const FormController = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
const Label = styled.label`
  font-family: Lato;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  color: #8f8f8f;
  margin-bottom: 9px;
`;
const Input = styled.input`
  width: 447px;
  height: 49px;
  background: #fcfcfc;
  border: 1px solid #f9f9f9;
  border-radius: 5px;
  padding: 1rem;
  outline: none;

  &::placeholder {
    font-family: Lato;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #d5d5d5;
  }

  ${tablet({
    width: "100%",
  })};
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Signin = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginUser = {
      email,
      password,
    };

    if (!email || !password) {
      return toast("All fields are required", { type: "error" });
    }

    try {
      setLoading(true);
      await axios.post("/api/users/login", loginUser);
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchIsLogged());
      setLoading(false);
      navigate("/dashboard");

      // const user = await auth.signInWithEmailAndPassword(email, password);
      // console.log(user);
      // toast("You have successfully logged in", { type: "success" });
      // navigate("/dashboard");
    } catch (error) {
      setLoading(true);
      toast(error.response?.data?.message, { type: "error" });
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <Section>
        <Container>
          <Left>
            <Head>Agent Sign in</Head>
            <Desc>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Desc>
            <Span>
              Don’t have an account?{" "}
              <Link className="link" to="/signup">
                <b>Become an Agent</b>
              </Link>
            </Span>
          </Left>
          <Right>
            <RightContainer>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormController>
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      placeholder="e.g - hotelinitiative@gmail.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormController>

                  <FormController>
                    <Label>Password</Label>

                    <Input
                      type="password"
                      placeholder="***************"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormController>
                </FormGroup>

                <ButtonContainer>
                  <Button text="Sign in" main="true" loading={loading} />
                </ButtonContainer>
              </Form>
            </RightContainer>
          </Right>
        </Container>
      </Section>
    </>
  );
};

export default Signin;
