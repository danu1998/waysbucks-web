import React, { useContext, useEffect, useState } from "react";
import { FaMoneyCheck } from "react-icons/fa";
import { Container } from "react-bootstrap";
import { GoTrashcan } from "react-icons/go";
import { API } from "../../../config/api";
import Margin from "../../../components/atoms/Margin";
import HeaderCustomer from "../../../components/moleculs/HeaderCustomer";
import { UserContext } from "../../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
// import { DataCart } from "./DataCart";
const Cart = () => {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    phone: "",
    name: "",
    address: "",
    income: "",
    postcode: "",
  });

  const cart = state.cart;
  console.log(cart);
  const saveCart = () => {
    dispatch({
      type: "SAVE_CART",
    });
  };

  const deleteCart = (item) => {
    dispatch({
      type: "RESET_CART",
      payload: "item",
    });
    saveCart();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const products = [];
      cart.map((item) => {
        const topings = [];
        item.topings.map((item) => topings.push(item.id));
        products.push({ idProduct: item.id, qty: 1, topings: topings });
      });
      let formData = new FormData();

      if (preview === null) {
      } else {
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("postcode", form.postcode);
        formData.append("address", form.address);
        formData.append("imgpay", preview);
        formData.append("income", subTotalCart);
        formData.append("products", JSON.stringify(products));

        const response = await API({
          method: "POST",
          url: "/transaction",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        console.log(response);
        dispatch({
          type: "RESET_CART",
        });
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };
  function handleChange(e) {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      order: cart,
      income: cart.subTotal,
    });
  }
  const subTotalCart = state.cart
    .map((product) => product.subTotal)
    .reduce((a, b) => a + b, 0);
  useEffect(() => {}, []);
  return (
    <div>
      <HeaderCustomer />
      <Margin />
      <Container>
        <h3 className="fw-bold text-danger">My Cart</h3>
        <div className="d-flex flex-row justify-content-between align-items-center gap-5">
          <div className="col-md-8">
            <h6 className="text-danger mt-3">Review Your Order</h6>
            <hr className="text-danger" style={{ height: "3px" }} />
            <div className="row mt-3">
              <div className="col-md-12">
                {cart.length < 1 ? (
                  <p>Empty cart</p>
                ) : (
                  cart.map((item, i) => (
                    <div className="row justify-content-start align-items-center">
                      <div className="col-md-2" key={i}>
                        <div>
                          <img
                            src={item.product.image}
                            alt="img-cart"
                            width={100}
                            height={100}
                            className="img-fluid"
                          ></img>
                        </div>
                      </div>
                      <div className="col-md-10">
                        <div className="row justify-content-between">
                          <div className="col-md-10">
                            <h5 className="fw-bold text-danger">
                              {item.product.name}
                            </h5>
                          </div>
                          <div className="col-md-2">
                            <p className="text-danger">{item.product.price}</p>
                          </div>
                        </div>
                        <div className="row justify-content-between">
                          <div className="col-md-11">
                            <div className="d-flex justify-content-start align-items-center">
                              <p
                                className="fw-bold"
                                style={{ color: "#974A4A" }}
                              >
                                Toping :
                              </p>
                              <p className="text-danger">
                                {item.topings
                                  .map((topingItem, i) => topingItem.name)
                                  .join(", ")}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-1">
                            <GoTrashcan
                              className="text-danger"
                              onClick={() => deleteCart(item)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <hr className="text-danger" style={{ height: "3px" }} />
            <div>
              <div className="row">
                <div className="col-md-8">
                  <hr className="text-danger" style={{ height: "3px" }} />
                  <div className="row">
                    <div className="row justify-content-between align-items-center">
                      <div className="col-md-9">
                        <p className="fw-bold text-danger">Subtotal</p>
                      </div>
                      <div className="col-md-3 text-danger">
                        <p>{subTotalCart}</p>
                      </div>
                    </div>
                    <div className="row justify-content-between align-items-center">
                      <div className="col-md-10">
                        <p className="text-danger">Qty</p>
                      </div>
                      <div className="col-md-2">
                        <p className="text-danger">{cart.length}</p>
                      </div>
                    </div>
                  </div>
                  <hr className="text-danger" style={{ height: "3px" }} />
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-9">
                      <p className="fw-bold text-danger">Total</p>
                    </div>
                    <div className="col-md-3">
                      <p className="text-danger">{subTotalCart}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <form>
                    <div className="card px-3 py-4 border-danger border-3">
                      <label for="file-input" className="text-center">
                        <FaMoneyCheck
                          style={{ width: "56px", height: "56px" }}
                          className="text-danger"
                        />
                        <input
                          style={{ display: "none" }}
                          id="file-input"
                          type="file"
                          name="image"
                          onChange={(e) => {
                            setPreview(e.target.files[0]);
                          }}
                        />
                        <h6 className="mt-3 text-danger">
                          Attache of Transaction
                        </h6>
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control border-danger border-2 py-2 "
                  id="inputName"
                  placeholder="Name"
                  name="name"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  className="form-control border-danger border-2 py-2"
                  id="inputEmail"
                  placeholder="Email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  className="form-control border-danger border-2 py-2"
                  id="inputPhone"
                  placeholder="Phone"
                  name="phone"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  id="inputPostCode"
                  className="form-control border-danger border-2 py-2"
                  placeholder="Post Code"
                  name="postcode"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="mb-4">
                <textarea
                  type="text"
                  id="inputAddress"
                  className="form-control border-danger border-2 py-2"
                  placeholder="Address"
                  rows={4}
                  cols={50}
                  name="address"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div className="d-grid gap-2">
                <button className="btn btn-danger" type="submit">
                  Pay
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
