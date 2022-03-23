import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import Margin from "../../../components/atoms/Margin";
import Display from "../../../components/moleculs/Display";
import HeaderAdmin from "../../../components/moleculs/HeaderAdmin";
import { API } from "../../../config/api";
import ProductAdmin from "../ProductAdmin";
const MainAdmin = () => {
  const [product, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const response = await API.get("/products");
      console.log(response.data);
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
      <HeaderAdmin />
      <Margin />
      <Container>
        <Display />
      </Container>
      <Margin />
      <Container>
        <h2 className="text-danger fw-bold">Let's Order</h2>
        <Margin />
        <div className="row">
          {product?.map((item, index) => (
            <ProductAdmin item={item} key={index} />
          ))}
        </div>
      </Container>
      <Margin />
    </div>
  );
};

export default MainAdmin;
