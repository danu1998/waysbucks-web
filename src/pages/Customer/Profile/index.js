import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import HeaderCustomer from "../../../components/moleculs/HeaderCustomer";
import Margin from "../../../components/atoms/Margin";
// import { DataProfile } from "./DataProfile";
import { imgBarcode, imgProduct1, logoImg } from "../../../assets/images";
import { UserContext } from "../../../context/userContext";
// import { DataCart } from "../Cart/DataCart";
import { API } from "../../../config/api";
import UpdateProfile from "../../../components/moleculs/Modal/UpdateProfile";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  let navigate = useNavigate();
  const [state] = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const [transactions, setTransaction] = useState([]);
  const [wait, setWait] = useState(false);

  const handleUpdate = (id) => {
    navigate("/updateprofile/" + profile.id);
  };

  const getProfile = async () => {
    try {
      const response = await API.get("/profiles");
      const getTransaction = await API.get("/cart");
      setProfile(response.data.data);
      setTransaction(getTransaction.data.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, [wait]);

  const handleFinish = async (id) => {
    setWait(true);

    const body = JSON.stringify({
      status: "Success",
    });

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      await API.patch("/transaction/" + id, body, config);
    } catch (err) {
      console.log(err.response.data.message);
      setWait(false);
    }
  };

  const path = "http://localhost:5000/uploads/";
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div>
      <HeaderCustomer />
      <Container>
        <Margin />

        <div className="row">
          <div className="col-md-6">
            <h2 className="fw-bold text-danger">My Profile</h2>
            <div className="row mt-5">
              <div className="col-md-4">
                <div className="d-flex justify-content-center align-items-center">
                  <img src={profile?.image} alt="img-profile" />
                </div>
                <div className="d-grid mt-3">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      handleUpdate(state.user.id);
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
              <div className="col-md-8">
                <div>
                  <h4 style={{ color: "#613D2B" }}>Full Name</h4>
                  <p>{state.user.fullName}</p>
                </div>
                <div>
                  <h4 className="mt-3" style={{ color: "#613D2B" }}>
                    Email
                  </h4>
                  <p>{state.user.email}</p>
                </div>
                <div>
                  <h4 className="mt-3" style={{ color: "#613D2B" }}>
                    Phone
                  </h4>
                  <p>{profile.phone}</p>
                </div>
                <div>
                  <h4 className="mt-3" style={{ color: "#613D2B" }}>
                    Gender
                  </h4>
                  <p>{profile.gender}</p>
                </div>
                <div>
                  <h4 className="mt-3" style={{ color: "#613D2B" }}>
                    Address
                  </h4>
                  <p>{profile.address}</p>
                </div>
              </div>
            </div>
            );
          </div>
          <div className="col-md-6">
            <h2 className="fw-bold" style={{ color: "#613D2B" }}>
              My Transaction
            </h2>
            <div className="alert-danger p-4 rounded mt-5">
              {transactions.length < 1 ? (
                <h5>Empty Transaction</h5>
              ) : (
                <div className="row">
                  {transactions.map((listTransaction) => (
                    <div key={listTransaction.id}>
                      <div className="row">
                        <div className="col-md-8">
                          <div className="row justify-content-start align-items-center">
                            {listTransaction.orders.map((order, i) => {
                              const date = new Date(listTransaction.createdAt);

                              return (
                                <>
                                  <div className="col-md-4 mt-3">
                                    <div>
                                      <img
                                        src={path + order.products.image}
                                        alt="img-product"
                                        className="img-fluid"
                                      ></img>
                                    </div>
                                  </div>
                                  <div className="col-md-8">
                                    <h5 className="fw-bold text-danger">
                                      {order.products.name}
                                    </h5>
                                    <div className="d-flex flex-row align-items-center">
                                      <p style={{ fontSize: "14px" }}>
                                        {days[date.getDay()]}-
                                      </p>

                                      <p
                                        className="text-danger"
                                        style={{ fontSize: "12px" }}
                                      >
                                        {date.getDate()}-
                                        {months[date.getMonth()]}-
                                        {date.getFullYear()}
                                      </p>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                      <p
                                        className="fw-bold text-danger"
                                        style={{ fontSize: "12px" }}
                                      >
                                        Toping :
                                      </p>
                                      <p
                                        className="text-danger"
                                        style={{ fontSize: "12px" }}
                                      >
                                        {order.topingorders
                                          .map((toping) => toping.topings.name)
                                          .join(", ")}
                                      </p>
                                    </div>
                                    <div className="d-flex flex-row align-items-center">
                                      <p
                                        className="text-danger"
                                        style={{ fontSize: "12px" }}
                                      >
                                        Price :
                                      </p>
                                      <p
                                        className="text-danger"
                                        style={{ fontSize: "12px" }}
                                      >
                                        {(
                                          order.topingorders
                                            .map(
                                              (toping) => toping.topings.price
                                            )
                                            .reduce((a, b) => a + b, 0) +
                                          order.products.price
                                        ).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              );
                            })}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="d-flex flex-column justify-content-center align-items-center">
                            <div>
                              <img src={logoImg} alt="logo-1"></img>
                            </div>
                            <div className="mt-3">
                              <img src={imgBarcode} alt="img-barcode"></img>
                            </div>
                            <div className="mt-3">
                              {listTransaction.status === "Waiting Approve" ? (
                                <p
                                  className="text-warning"
                                  style={{ color: "#FF9900" }}
                                >
                                  {listTransaction.status}
                                </p>
                              ) : listTransaction.status === "Success" ? (
                                <p
                                  className="text-success"
                                  style={{ color: "#78A85A" }}
                                >
                                  {listTransaction.status}
                                </p>
                              ) : listTransaction.status === "On The Way" ? (
                                <p
                                  className="text-primary"
                                  style={{ color: "#00D1FF" }}
                                >
                                  {listTransaction.status}
                                </p>
                              ) : (
                                <p
                                  className="text-danger"
                                  style={{ color: "#E83939" }}
                                >
                                  {listTransaction.status}
                                </p>
                              )}
                            </div>
                            <div>
                              <p
                                className="fw-bold"
                                style={{ color: "#974A4A" }}
                              >
                                Sub Total : {listTransaction.income}
                              </p>
                            </div>
                            <div>
                              {listTransaction.status === "On the way" ? (
                                <>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                      handleFinish(listTransaction.id)
                                    }
                                  >
                                    Finish
                                  </button>
                                </>
                              ) : (
                                " "
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
