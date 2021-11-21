import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="h-screen py-20"
      style={{
        background:
          "linear-gradient(100deg, #000000a0, #000000b0), url(https://d341ezm4iqaae0.cloudfront.net/assets/2020/06/30160014/librarian-scaled.jpg)",
        backgroundSize: "cover",

        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="title flex">
        {/* first half */}
        <div className="w-4/6 flex flex-col items-center justify-center">
          <h2 className="text-gray-200 text-center text-5xl font-bold">
            TECHNICAL SCITTERS <br />
            <br />
            COURSE MANAGEMENT SYSTEM
          </h2>
          <span className="font-bold text-2xl my-10 text-gray-200">
            Institute of academic excellence and cultural diversity.
          </span>
        </div>

        <div
          className="bg-white w-2/6 mr-5 flex flex-col justify-evenly items-center"
          style={{ height: "500px" }}
        >
          <div className="px-5 w-full ">
            <h2 className="card-title text-2xl font-medium">JOIN SYSTEM AS</h2>
            <hr className="my-3" />
          </div>

          <a
            href="http://localhost:3000/dashboard"
            className="bg-indigo-800 p-2.5 btn w-5/6 text-white"
          >
            ADMIN
          </a>

          <Link
            as="div"
            to="/dashboard"
            className="bg-indigo-800 p-2.5 btn w-5/6 text-white"
          >
            INSTRUCTOR
          </Link>

          <Link
            as="div"
            to="/"
            className="bg-indigo-800 p-2.5 btn w-5/6 text-white"
          >
            STUDENT
          </Link>
        </div>
        {/* second half */}
      </div>
    </div>
  );
};

export default LandingPage;
