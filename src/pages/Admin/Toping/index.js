import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Margin from "../../../components/atoms/Margin";
import HeaderAdmin from "../../../components/moleculs/HeaderAdmin";
import { API } from "../../../config/api";
import TopingAdmin from "../TopingAdmin";
const Toping = () => {
  const [toping, setTopings] = useState([]);
  const getTopings = async () => {
    try {
      const response = await API.get("/topings");
      console.log(response);
      setTopings(response.data.data.topings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopings();
    return () => {
      setTopings([]);
    };
  }, []);

  return (
    <div>
      <HeaderAdmin />
      <Margin />
      <Container>
        <h3>Toping List</h3>
        <Margin />
        <div className="row">
          {toping?.map((item, index) => (
            <TopingAdmin item={item} key={index} topingFn={getTopings} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Toping;
