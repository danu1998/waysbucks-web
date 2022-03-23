import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  return (
    <div className="col-md-3 col-sm-12">
      <Link to={`/detail/ + item.id`} className="text-decoration-none">
        <div className="card">
          <img
            src={item.image}
            className="card-img-top img-fluid"
            alt="img-product"
          />
          <div className="card-body alert-danger ">
            <h5 className="card-text text-danger">{item.name}</h5>
            <p className="card-text text-danger">{item.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
