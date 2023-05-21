import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";

type Props = {};

export default function Hometemplate({}: Props) {

  return (
    <>
      {" "}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
