import React from "react";
import Footer from "./Footer";
import Navbars from "./Navbars";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

const Layout = () => {
  return (
    <>
      <Navbars />
      <Container>
        <main>
          <Outlet />
        </main>
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
