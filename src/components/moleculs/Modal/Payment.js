import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const Payment = ({ image }) => {
  const [modal, setModal] = useState(false);
  const showModal = () => setModal(true);
  const closeModal = () => setModal(false);
  const path = "http://localhost:5000/uploads/";
  return (
    <div>
      <label onClick={showModal} size="sm" style={{ color: "#061E99" }}>
        View Payment
      </label>
      <Modal show={modal} onHide={closeModal}>
        <Modal.Body>
          <h5 className="text-center my-3 text-danger">Transaction Payment</h5>
          <center>
            <img src={path + image} alt="payment" />
          </center>
          <div className="d-flex justify-content-around">
            <Button className="btn btn-danger mt-4" onClick={closeModal}>
              Back
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Payment;
