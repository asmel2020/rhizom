import React from "react";
import { Card } from "./componetes/Card";
import { Navbar } from "./componetes/Navbar";

export const App = () => {
  return (
    <>
      <div class="position-relative">
        <img className=" img-rhizom" src="asset/cover-bg4.jpg" alt="" />
      </div>
      <Navbar />

      <Card />
    </>
  );
};
