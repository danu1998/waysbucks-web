import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { imgBarcode, logoImg } from "../../../assets/images";
import { API } from "../../../config/api";
const TransactionDetail = () => {
  const [transactions, setTransaction] = useState([]);
  const [wait, setWait] = useState(false);
  const [modal, setModal] = useState(false);
  const showModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const path = "http://localhost:5000/uploads/";

  const getDataTransaction = async () => {
    try {
      const response = await API.get("/transactions");
      setTransaction(response.data.data.transactions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataTransaction();
  }, [wait]);

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
      {transactions.map((listTransaction) => (
        <div key={listTransaction.id}>
          <p onClick={showModal} size="sm" style={{ color: "#061E99" }}>
            {listTransaction.income}
          </p>
        </div>
      ))}

      <Modal show={modal} onHide={closeModal}>
        <div className="alert alert-danger">
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
                                      .map((toping) => toping.topings.price)
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
                        <p className="fw-bold" style={{ color: "#974A4A" }}>
                          Sub Total : {listTransaction.income}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-around">
            <Button className="btn btn-danger mt-4" onClick={closeModal}>
              Back
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TransactionDetail;
