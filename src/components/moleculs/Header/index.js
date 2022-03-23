import React, { Fragment, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logoImg } from "../../../assets/images";
import ButtonNav from "../../atoms/ButtonNav";

const Header = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg">
        <Container>
          <Link to="/">
            <img src={logoImg} alt="logo-1"></img>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto ">
              <ButtonNav />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
