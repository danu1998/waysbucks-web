import React, { useContext, useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiShoppingBag } from "react-icons/bi";
import { Dropdown, Nav } from "react-bootstrap";
// import { userImg } from "../../../assets/images";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { API } from "../../../config/api";
const ProfileNav = ({ count, setCount }) => {
  let { id } = useParams();
  const [profile, setProfile] = useState({});
  const [state, dispatch] = useContext(UserContext);
  let navigate = useNavigate();
  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  const getUser = async () => {
    try {
      //   setWait(true)
      const getProfile = await API.get("/profiles");
      setProfile(getProfile.data.data);
      //  setWait(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [state]);

  return (
    <div className="d-flex justify-content-end align-items-center gap-5">
      <Link to="/cart">
        <div className="d-flex">
          <BiShoppingBag
            style={{ width: "28px", height: "28px" }}
            className="text-danger"
          />
          {state.cart.length > 0 ? (
            <div
              className="rounded-pill bg-danger text-center text-white"
              style={{ width: "24px", height: "24px" }}
            >
              {state.cart.length}
            </div>
          ) : (
            <div
              className="rounded-pill bg-danger text-center text-white"
              style={{ width: "24px", height: "24px" }}
            >
              0
            </div>
          )}
        </div>
      </Link>

      <div>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="light">
            <img
              src={profile?.image}
              className="rounded-circle"
              alt="img-user"
              style={{ width: "75px", height: "75px" }}
            ></img>
          </Dropdown.Toggle>

          <Dropdown.Menu variant="light">
            <Link
              to="/profile"
              className="d-flex justify-content-center text-dark align-items-center gap-3 text-decoration-none"
            >
              <FiUser className="text-danger" />
              Profile
            </Link>
            <Dropdown.Divider />
            <Nav.Link
              onClick={logout}
              className="d-flex justify-content-center align-items-center text-decoration-none gap-3 text-dark"
            >
              <RiLogoutBoxRLine className="text-danger" /> Logout
            </Nav.Link>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default ProfileNav;
