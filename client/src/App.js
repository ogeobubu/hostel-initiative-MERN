import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product";
import Market from "./pages/Market";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import NoPageFound from "./pages/NoPageFound";
import { dispatchAllAccomodations } from "./redux/accomodationsSlice";
import { dispatchUserToken, dispatchUser } from "./redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const isLogged = useSelector((state) => state.user.isLogged);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
      try {
        const getToken = async () => {
          const response = await axios.get("/api/users/refresh_token");
          dispatch(dispatchUserToken(response.data.access_token));
        };
        getToken();
      } catch (error) {}
    }
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        const response = await axios.get("/api/users", {
          headers: {
            Authorization: token,
          },
        });
        dispatch(dispatchUser(response.data.message));
      };
      getUser();
    }
  }, [token, dispatch]);

  // useEffect(() => {
  //   const getAllAccomodations = async () => {
  //     await database.ref(`accomodations`).on("value", (snapshot) => {
  //       if (snapshot.exists()) {
  //         let returnArr = [];

  //         snapshot.forEach((childSnapshot) => {
  //           let item = childSnapshot.val();
  //           returnArr.push(item);
  //         });
  //         console.log(returnArr);
  //         dispatch(dispatchAllAccomodations(returnArr));
  //       } else {
  //         console.log("No data available");
  //       }
  //     });
  //   };
  //   getAllAccomodations();
  // }, []);

  useEffect(() => {
    const getAllAccomodations = async () => {
      try {
        const response = await axios.get("/api/accomodations");
        dispatch(dispatchAllAccomodations(response.data.message));
      } catch (error) {
        console.log(error.message);
      }
    };
    getAllAccomodations();
  }, [dispatch]);

  return (
    <div className="container">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:_id" element={<Product />} />
          <Route path="/market" element={<Market />} />
          <Route path="*" element={<NoPageFound />} />
          <Route
            path="/signup"
            element={
              isLogged === true ? <Navigate to="/dashboard" /> : <Signup />
            }
          />
          <Route
            path="/signin"
            element={
              isLogged === true ? <Navigate to="/dashboard" /> : <Signin />
            }
          />
          <Route
            path="/dashboard/*"
            element={
              isLogged === true ? <Dashboard /> : <Navigate to="/signin" />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
