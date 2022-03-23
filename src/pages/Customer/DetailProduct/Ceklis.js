import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { API } from "../../../config/api";
const Ceklis = ({ image, item }) => {
  let { id } = useParams();
  const [checked, setChecked] = useState(false);
  const [toping, setTopings] = useState([]);
  const [topingId, setTopingId] = useState({});
  const handleChecked = async (id) => {
    setChecked(!checked);
    toping.find((item) => item.id === id).checked = checked;
  };
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
      <div onClick={(id) => handleChecked(id)}>
        {checked && (
          <BsCheckCircleFill className="text-success me-1 position-absolute absolute" />
        )}
        <img
          src={image}
          alt="img-toping"
          style={{ height: "85px", width: "75px" }}
          value={item}
        ></img>
      </div>
    </div>
  );
};

export default Ceklis;
