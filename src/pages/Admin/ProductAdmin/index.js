import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteProduct from "../../../components/moleculs/Modal/DeleteProduct";
import { API } from "../../../config/api";
const ProductAdmin = ({ item }) => {
  let navigate = useNavigate();
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = async (id) => {
    try {
      await API.delete(`/product/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  const handleUpdate = (id) => {
    navigate("/updateproduct/" + id);
  };
  return (
    <div className="col-md-3 col-sm-12">
      <div className="text-decoration-none">
        <div className="card">
          <img
            src={item.image}
            className="card-img-top img-fluid"
            alt="img-product"
          />
          <div className="card-body alert-danger ">
            <h5 className="card-text text-danger">{item.name}</h5>
            <p className="card-text text-danger">{item.price}</p>
            <div className="d-flex gap-2">
              <button
                onClick={() => {
                  handleUpdate(item.id);
                }}
                className="btn btn-warning"
              >
                Update
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <DeleteProduct
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ProductAdmin;
