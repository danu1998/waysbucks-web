import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Margin from "../../../components/atoms/Margin";
import Display from "../../../components/moleculs/Display";
import HeaderCustomer from "../../../components/moleculs/HeaderCustomer";
import { API } from "../../../config/api";
import ProductCustomer from "../ProductCustomer";
const MainCustomer = () => {
  const [product, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await API.get("/products");
      console.log(response);
      setProducts(response.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
    return () => {
      setProducts({});
    };
  }, []);
  return (
    <div>
      <HeaderCustomer />
      <Margin />
      <Container>
        <Display />
      </Container>
      <Margin />
      <Container>
        <h2 className="fw-bold text-danger">Let's Order</h2>
        <Margin />
        <div className="row">
          {product?.map((item, index) => (
            <ProductCustomer item={item} key={index} />
          ))}
        </div>
      </Container>
      <Margin />
    </div>
  );
};

export default MainCustomer;
