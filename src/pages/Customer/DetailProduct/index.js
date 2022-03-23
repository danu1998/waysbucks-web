import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Margin from "../../../components/atoms/Margin";
import HeaderCustomer from "../../../components/moleculs/HeaderCustomer";
import { API } from "../../../config/api";
import Ceklis from "./Ceklis";
const DetailProduct = () => {
  const [toping, setTopings] = useState([]);
  const getTopings = async () => {
    try {
      const response = await API.get("/topings");
      console.log(response);
      setTopings(
        response.data.data.topings.map((item) => {
          return { ...item, checked: false };
        })
      );
      console.log(toping);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopings();
  }, []);
  return (
    <div>
      <HeaderCustomer />
      <Margin />
      <Container>
        {toping?.map((item) => (
          <div key={item.id}>
            <Ceklis image={item.image} id={item.id} />
          </div>
        ))}
      </Container>
    </div>
  );
};

export default DetailProduct;
