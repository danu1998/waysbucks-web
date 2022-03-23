import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Margin from "../../../components/atoms/Margin";
import HeaderAdmin from "../../../components/moleculs/HeaderAdmin";
import { CgAttachment } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../config/api";

const UpdateProduct = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [product, setProduct] = useState({});

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const getProduct = async (id) => {
    try {
      const response = await API.get("/product/" + id);
      setPreview(response.data.data.image);
      setForm({
        ...form,
        name: response.data.data.name,
        price: response.data.data.price,
      });
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("name", form.name);
      formData.set("price", form.price);

      const response = await API.patch(
        "/product/" + product.id,
        formData,
        config
      );
      console.log(response.data);
      navigate("/mainadmin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <HeaderAdmin />
      <Margin />
      <Container>
        <div className="row justify-content-between align-items-center">
          <div className="col-md-8">
            <h3 className="mx-5">Product</h3>
            <div className="mt-5 mx-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control border-danger border-3"
                    onChange={handleChange}
                    value={form.name}
                    name="name"
                    placeholder="Name Product"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control border-danger border-3"
                    onChange={handleChange}
                    name="price"
                    value={form.price}
                    placeholder="Price"
                  />
                </div>

                <div className="card p-2 border-danger border-3">
                  <label className="text-center" for="file-input">
                    <input
                      style={{ display: "none" }}
                      id="file-input"
                      type="file"
                      onChange={handleChange}
                      name="image"
                    />
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className=" mt-1 text-danger">Photo Product</h6>
                      <CgAttachment />
                    </div>
                  </label>
                </div>

                <div className="d-grid gap-2 mt-5">
                  <button type="submit" className="btn btn-danger">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4">
            {preview && (
              <div>
                <img src={preview} alt="img-product" width={400} height={500} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UpdateProduct;
