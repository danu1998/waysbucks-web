import React, { Fragment, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logoImg } from "../../../assets/images";
import AdminNav from "../../atoms/AdminNav";
const HeaderAdmin = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Link to="/mainadmin">
            <img src={logoImg} alt="logo-1"></img>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto ">
              <AdminNav />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderAdmin;
