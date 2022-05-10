import React from "react";
import { Login } from "./Login";

export const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-transparent mt-4">
      <div class="container">
        <a class="navbar-brand" href="https://rhizom.me/">
        <img src="/asset/rhizom-logo-full.svg" alt="" className="logo" width="200"  />

        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
         <div className="ms-auto">
          <Login />
         </div>
        </div>
      </div>
    </nav>
  );
};
