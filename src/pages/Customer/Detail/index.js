import React, { useContext, useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Margin from "../../../components/atoms/Margin";
import HeaderCustomer from "../../../components/moleculs/HeaderCustomer";
import { API } from "../../../config/api";
import { UserContext } from "../../../context/userContext";
import ListToping from "../List/ListToping";

const Detail = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [product, setProduct] = useState([]);
  const [topings, setTopings] = useState([]);
  const [checkedToping, setCheckedToping] = useState({});

  const getProduct = async () => {
    try {
      const productResponse = await API.get("/product/" + id);
      const topingResponse = await API.get("/topings");
      console.log(productResponse, topingResponse);
      setProduct(productResponse.data.data);
      setTopings(topingResponse.data.data.topings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleChange = (event) => {
    setCheckedToping({
      ...checkedToping,
      [event.target.id]: event.target.checked,
    });
  };

  const selectedTopingId = [];
  for (var key in checkedToping) {
    if (checkedToping.hasOwnProperty(key)) {
      checkedToping[key]
        ? selectedTopingId.push(key)
        : selectedTopingId.splice(key, 1);
    }
  }

  const selectedToping = selectedTopingId.map((selectedTopingId) =>
    topings.find((item) => item.id == selectedTopingId)
  );

  const subTotal = selectedToping
    .map((selectedToping) => selectedToping.price)
    .reduce((p, c) => p + c, product.price);

  const handleToCart = async (e) => {
    e.preventDefault();
    console.log(selectedTopingId);
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.id,
        product: product,
        topings: selectedToping,
        initialPrice: subTotal,
        quantity: 1,
        subTotal: subTotal,
      },
    });
    dispatch({
      type: "SAVE_CART",
    });
    setCheckedToping({});
  };

  return (
    <div>
      <HeaderCustomer />
      <Margin />
      <Container>
        <div>
          <div className="row">
            <div className="col-md-5 col-sm-12" key={id}>
              <div>
                <img
                  src={product.image}
                  alt="img-detail"
                  style={{ height: "600px" }}
                ></img>
              </div>
            </div>
            <div className="col-md-7 col-sm-12">
              <h1 className="fw-bold">{product.name}</h1>
              <h5 className="fs-5 mt-3">{product.price}</h5>
              <div className="row mt-5">
                <div className="d-flex flex-row justify-content-start mb-5 text-center">
                  {topings.map((topping) => (
                    <Col md={3}>
                      <ListToping
                        topping={topping}
                        key={topping.id}
                        onChange={handleChange}
                        checked={checkedToping[topping.id] || false}
                      />
                    </Col>
                  ))}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="fw-bold">Product Price :{product.price}</h4>
                <h4 className="fw-bold">Sub Total : {subTotal} </h4>
              </div>
              <div className="d-grid mt-5">
                <button className="btn btn-danger" onClick={handleToCart}>
                  Add Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Detail;
