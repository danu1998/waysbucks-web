import React, { useContext } from "react";
import { MdPayment } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Dropdown, Nav } from "react-bootstrap";
import { userImg } from "../../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { productAdmin, topingAdmin } from "../../../assets/icons";
import { UserContext } from "../../../context/userContext";
const AdminNav = () => {
  const [state, dispatch] = useContext(UserContext);
  let navigate = useNavigate();
  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  return (
    <div className="d-flex justify-content-end align-items-center gap-5">
      <div>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="light">
            <img src={userImg} className="" alt="img-user"></img>
          </Dropdown.Toggle>

          <Dropdown.Menu variant="light">
            <Link
              to="/addproduct"
              className="d-flex justify-content-center text-dark align-items-center gap-3 text-decoration-none mt-4 fw-bold"
            >
              <img
                src={productAdmin}
                alt="adm-product"
                width={24}
                height={24}
              ></img>
              Add Product
            </Link>
            <Link
              to="/addtoping"
              className="d-flex justify-content-center text-dark align-items-center gap-3 text-decoration-none my-4 fw-bold"
            >
              <img
                src={topingAdmin}
                alt="adm-toping"
                width={24}
                height={24}
              ></img>
              Add Toping
            </Link>
            <Link
              to="/topingPage"
              className="d-flex justify-content-center text-dark align-items-center gap-3 text-decoration-none my-4 fw-bold"
            >
              <img
                src={topingAdmin}
                alt="adm-toping"
                width={24}
                height={24}
              ></img>
              Toping List
            </Link>
            <Link
              to="/transaction"
              className="d-flex justify-content-center text-dark align-items-center gap-3 text-decoration-none my-4 fw-bold"
            >
              <MdPayment className="text-danger" />
              Transaction
            </Link>
            <Dropdown.Divider />
            <Nav.Link
              onClick={logout}
              className="d-flex justify-content-center align-items-center text-decoration-none gap-3 text-dark fw-bold"
            >
              <RiLogoutBoxRLine className="text-danger" /> Logout
            </Nav.Link>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};

export default AdminNav;
