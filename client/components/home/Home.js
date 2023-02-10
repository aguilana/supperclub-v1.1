import React from "react";
import { useSelector } from "react-redux";
import { Header } from "../index";
import { About } from "../index"

/**
 * COMPONENT
 */
const Home = (props) => {

  return (
    <div>
      <Header />
      <About />
    </div>
  );
};

export default Home;
