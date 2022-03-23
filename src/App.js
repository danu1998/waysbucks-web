import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// ============== || ===============

import { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/userContext";
// ============== || ===============
import Home from "./pages/Home/Home";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
// import Detail from "./pages/Customer/Detail";
import Detail from "./pages/Customer/Detail";
import Profile from "./pages/Customer/Profile";
import Cart from "./pages/Customer/Cart";
import AddProduct from "./pages/Admin/AddProduct";
import AddToping from "./pages/Admin/AddToping";
import Transaction from "./pages/Admin/Transaction";
import MainAdmin from "./pages/Admin/MainAdmin";
import MainCustomer from "./pages/Customer/MainCustomer";
import Toping from "./pages/Admin/Toping";
// =============== || ===============
import { API, setAuthToken } from "./config/api";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import UpdateToping from "./pages/Admin/UpdateToping";
import UpdateProfile from "./pages/Customer/UpdateProfile";
// =============== || ===============
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
// =============== || ===============
function App() {
  // =============== || ===============
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  useEffect(() => {
    if (state.isLogin == false) {
      navigate("/");
    } else {
      if (state.user.status === "admin") {
        navigate("/mainadmin");
      } else if (state.user.status === "customer") {
        navigate("/maincustomer");
      }
    }
    // eslint-disable-next-line
  }, [state]);
  // =============== || ===============
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      let payload = response.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      dispatch({
        type: "UPDATE_CART",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
    // eslint-disable-next-line
  }, []);
  // =============== || ===============
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/detail/:id" element={<Detail />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/updateprofile/:id" element={<UpdateProfile />} />
      <Route exact path="/mainadmin" element={<MainAdmin />} />
      <Route exact path="/maincustomer" element={<MainCustomer />} />
      <Route exact path="/cart" element={<Cart />} />
      <Route exact path="/addproduct" element={<AddProduct />} />
      <Route exact path="/updateproduct/:id" element={<UpdateProduct />} />
      <Route exact path="/updatetoping/:id" element={<UpdateToping />} />
      <Route exact path="/addtoping" element={<AddToping />} />
      <Route exact path="/transaction" element={<Transaction />} />
      <Route exact path="/topingPage" element={<Toping />} />
    </Routes>
  );
}

export default App;
