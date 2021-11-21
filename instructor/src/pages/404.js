import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div class="container">
      <section class="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
        <h1>401</h1>
        <h2 className="text-3xl">You are not authorized to access account!.</h2>
        <h2 className="text-xl">Contact Admin for more information.</h2>
        <Link class="btn" to="/">
          Back to home
        </Link>
        <img
          src="assets/img/not-found.svg"
          class="img-fluid py-5"
          alt="Page Not Found"
        />
        <div class="credits"></div>
      </section>
    </div>
  );
};

export default NotFound;
