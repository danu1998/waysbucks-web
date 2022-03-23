import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Margin from "../../../components/atoms/Margin";
import HeaderAdmin from "../../../components/moleculs/HeaderAdmin";
import { API } from "../../../config/api";
import { checkIcon, xIcon } from "../../../assets/icons";
import Payment from "../../../components/moleculs/Modal/Payment";
import TransactionDetail from "../../../components/moleculs/Modal/TransactionDetail";
const Transaction = () => {
  const [transaction, setTransaction] = useState([]);
  const [wait, setWait] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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

  const handleApprove = async (id) => {
    setWait(true);
    const body = JSON.stringify({
      status: "On the way",
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      await API.patch("/transaction/" + id, body, config);
      setWait(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (id) => {
    setWait(true);
    const body = JSON.stringify({
      status: "Canceled",
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      await API.patch("/transaction/" + id, body, config);

      setWait(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <HeaderAdmin />
      <Margin />
      <Container>
        <h3 className="fw-bold text-danger">Income Transaction</h3>
        <div>
          <table className="table table-bordered border-secondary">
            <thead>
              <tr className="table-secondary">
                <th scope="col">No</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">Post Code</th>
                <th scope="col">Income</th>
                <th scope="col">Payment</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {transaction.map((transactions, i) => (
                <tr key={transactions.id}>
                  <th className="text-center">{i + 1}</th>
                  <td className="text-center">{transactions.name}</td>
                  <td className="text-center">{transactions.address}</td>
                  <td className="text-center">{transactions.postcode}</td>
                  <td className="text-center">
                    <TransactionDetail
                      setShow={show}
                      handleClose={handleClose}
                      id={transactions.id}
                      image={transactions.imgpay}
                    />
                  </td>
                  <td className="text-center">
                    <Payment
                      setShow={show}
                      handleClose={handleClose}
                      id={transactions.id}
                      image={transactions.imgpay}
                    />
                  </td>
                  <td className="text-center">
                    {transaction.status === "Waiting Approve" ? (
                      <p style={{ color: "yellow" }}>{transactions.status}</p>
                    ) : transaction.status === "Success" ? (
                      <label style={{ color: "green" }}>
                        {transactions.status}
                      </label>
                    ) : transaction.status === "On The Way" ? (
                      <label style={{ color: "blue" }}>
                        {transactions.status}
                      </label>
                    ) : (
                      <label style={{ color: "red" }}>
                        {transactions.status}
                      </label>
                    )}
                  </td>
                  <td className="text-center">
                    {transactions.status === "Waiting Approve" ? (
                      <>
                        <button
                          className="btn btn-danger px-5"
                          size="sm"
                          style={{ margin: "2px" }}
                          onClick={() => handleCancel(transactions.id)}
                        >
                          Cancel
                        </button>
                        <button
                          className="btn btn-success px-5"
                          size="sm"
                          style={{ margin: "2px" }}
                          onClick={() => handleApprove(transactions.id)}
                        >
                          Approve
                        </button>
                      </>
                    ) : transactions.status === "Completed" ? (
                      <div>
                        <img
                          src={checkIcon}
                          alt="icon"
                          style={{ width: "18px", height: "18px" }}
                        />
                      </div>
                    ) : transactions.status === "Canceled" ? (
                      <img
                        src={xIcon}
                        alt="icon"
                        style={{ width: "18px", height: "18px" }}
                      />
                    ) : (
                      <img
                        src={checkIcon}
                        alt="icon"
                        style={{ width: "18px", height: "18px" }}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default Transaction;
