import React, { useEffect, useState } from "react";
import HeaderCustomer from "../../../components/moleculs/HeaderCustomer";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../config/api";
import Margin from "../../../components/atoms/Margin";
import { Button, Container } from "react-bootstrap";

const UpdateProfile = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [preview, setPreview] = useState(null);
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState({
    phone: "",
    gender: "",
    address: "",
    image: "",
  });
  const getProfile = async () => {
    try {
      const response = await API.get("/profile/" + id);
      setProfile(response.data.data.image);
      setForm({
        ...form,
        phone: response.data.data.phone,
        gender: response.data.data.gender,
        address: response.data.data.address,
      });
      setProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile(id);
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
    console.log(handleChange);
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
        formData.set("image", form?.image[0], form?.image[0].name);
      }
      formData.set("phone", form.phone);
      formData.set("gender", form.gender);
      formData.set("address", form.address);

      const response = await API.patch(
        "/profile/" + profile.id,
        formData,
        config
      );
      console.log(response.data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
    console.log(handleSubmit);
  };

  return (
    <div>
      <HeaderCustomer />
      <Margin />
      <Container>
        <div>
          <h4 className="text-danger mb-5">Update Profile</h4>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4">
                  <div>
                    <img src={preview} alt="img-profile" />
                  </div>
                  <div className="card bg-danger mt-3">
                    <label className="text-center" for="file-input">
                      <input
                        style={{ display: "none" }}
                        id="file-input"
                        type="file"
                        onChange={handleChange}
                        name="image"
                      />
                      <p className="text-white mt-2">upload photo</p>
                    </label>
                  </div>
                </div>
                <div className="col-md-7">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control border-danger border-3"
                      onChange={handleChange}
                      value={form.phone}
                      name="phone"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control border-danger border-3"
                      onChange={handleChange}
                      value={form.gender}
                      name="gender"
                      placeholder="Gender"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control border-danger border-3"
                      onChange={handleChange}
                      value={form.address}
                      name="address"
                      placeholder="Your Address"
                    />
                  </div>
                </div>
              </div>
              <div className=" mt-5">
                <Button
                  type="submit"
                  size="sm"
                  className="btn-success"
                  style={{ width: "135px" }}
                >
                  Update Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default UpdateProfile;
