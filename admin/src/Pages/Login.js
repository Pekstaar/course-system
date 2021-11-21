import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import { toastError, toastSuccess } from "../components/toaster";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setInitState, initState } = React.useContext(Context);
  const navigate = useNavigate();

  const [id, setId] = React.useState("ADM001");
  const [password, setPassword] = React.useState("12345");

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/api/auth/login/admin", {
        code: id,
        password,
      })
      .then((response) => {
        setInitState({ auth: response.data });
        // console.log(response);
        // toast success
        toastSuccess("Login successful!");
        // redirect to admin dashboard
        navigate("/");
      })
      .catch((err) => toastError(err.message));
  };

  // check if user has logged in
  React.useEffect(() => {
    if (initState.auth) {
      navigate("/dashboard");
    }
  }, [initState, navigate]);

  return (
    <div className="flex items-center justify-center">
      <div className="lg:w-7/12 sm:w-3/4 w-full bg-white mt-20 py-4 px-2 sm:px-4 ">
        <h1 className="text-center font-medium uppercase text-xl sm:text-2xl text-gray-600 py-5 sm:py-10">
          Admin Login
        </h1>
        <hr className="" />

        <form
          onSubmit={handleSubmit}
          className="form pb-6 flex items-center flex-col"
        >
          <br />
          <br />
          {/* email input field */}
          <input
            type="text"
            name="workId"
            value={id}
            placeholder="Enter work id"
            className="p-3 my-2 outline-none border-gray-300 text-gray-500 rounded  border-1 mx-5 w-full md:mx-0 md:w-4/6"
            onChange={(e) => setId(e.target.value)}
          />

          {/* password input field */}
          <input
            type="password"
            name="password"
            placeholder="password "
            value={password}
            className="p-3 my-2 outline-none border-gray-300 text-gray-500 rounded  border-1 mx-5 w-full md:mx-0 md:w-4/6"
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* forgot password link to:/forgotpassword */}
          <Link
            as="span"
            to="/forgotpassword"
            className="mx-5 py-2 text-sm w-full md:mx-0 md:w-4/6 text-gray-500 hover:underline"
          >
            Forgot Password? click here to reset.
          </Link>

          {/* login button */}
          <div className="submit mx-5 w-full md:mx-0 md:w-4/6  my-4 flex justify-center">
            <button
              type="submit"
              className={`uppercase w-3/4 text rounded-3xl p-3 bg-indigo-700 text-white hover:bg-indigo-800`}
            >
              login
            </button>
          </div>

          {/* have no account link */}
          <Link
            as="span"
            to="/signup"
            className=" text-center mt-2 py-2 w-full md:mx-0 md:w-4/6 text-gray-500 hover:underline"
          >
            Have no account? click here to sign-up
          </Link>
        </form>
      </div>
    </div>
  );
};
export default Login;
