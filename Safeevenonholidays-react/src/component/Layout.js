import React from "react";
import Footer from "./Footer";
import Navbars from "./Navbars";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbars />
        <main>
          <Outlet />
        </main>
      <Footer />
    </>
  );
};

export default Layout;
