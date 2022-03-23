import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Margin from "../../components/atoms/Margin";
import Display from "../../components/moleculs/Display";
import Header from "../../components/moleculs/Header";
import NotifTransaction from "../../components/atoms/NotifTransaction";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { API } from "../../config/api";
import ProductCard from "./ProductCard";
const Home = () => {
  // let navigate = useNavigate;
  // const [state] = useContext(UserContext);
  // const checkAuth = () => {
  //   if (!state.isLogin) {
  //     navigate("/mainadmin");
  //   }
  // };
  // checkAuth();

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
      <Header />
      <Margin />
      <Container>
        <Display />
      </Container>
      <Margin />
      <Container>
        <div className="row">
          {product?.map((item, index) => (
            <ProductCard item={item} key={index} />
          ))}
        </div>
      </Container>
      <Margin />
    </div>
  );
};

export default Home;
