import React, { useContext, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";
import { toastError, toastSuccess } from "../components/toaster";

import { IoPerson } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Context } from "../context/Context";

const Account = () => {
  const { initState } = useContext(Context);
  const [state, setState] = useState({});
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirmNew: "",
  });

  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const r = await axios.post(
      `${process.env.REACT_APP_VAR_API}auth/validate`,
      {
        id: initState.auth._id,
        password: passwords.old,
        encryptedPassword: initState.auth.user.password,
      }
    );

    // const validPassword = bcrypt.compare(
    //   passwords.old,
    //   initState.auth.user.password
    // );

    const isValid = r.data;

    if (
      passwords.old === "" ||
      passwords.new === "" ||
      passwords.confirmNew === ""
    ) {
      toastError("All fields are required");
      return;
    } else if (passwords.new !== passwords.confirmNew) {
      toastError("New passwords do not match!");
      return;
    } else if (!isValid) {
      toastError("Wrong Password!");
      return;
    }
    if (window.confirm("Are you sure you wanna Reset password?")) {
      axios
        .post(`${process.env.REACT_APP_VAR_API}auth/pwd/instructor`, {
          id: initState.auth.user._id,
          password: passwords.new,
        })
        .then((r) => toastSuccess("Password updated successfully!"))
        .catch((err) => toastError(err.message));
    }
  };
  // load School on mount
  React.useEffect(() => {
    setState(initState.auth);
  }, [initState]);

  // check if one is authenticated
  React.useEffect(() => {
    !initState.auth && navigate("/login");
  }, [initState.auth, navigate]);
  //   const [selectedSchool, setSelectedSchool] = useState({});

  return (
    <>
      <Navbar />
      <Sidebar />
      <div classNameName=" h-full mt-14 py-2" style={{ marginLeft: "300px" }}>
        <div classNameName="w-full px-4 ">
          {/* fields: firstname, lastname, email, dob, phoneno,location address,school,course,level */}
          {/* registration form */}
          <div className="card mt-16">
            <h5 className="card-title mx-4 uppercase text-xl">
              Reset Password
            </h5>
            <div className="card-body">
              {/* profile image */}
              <div className="rounded-full flex justify-end gap-3 px-4">
                <div className="editbtn">
                  <button
                    className="bg-yellow-500 py-2 px-4 gap-1 flex items-center text-white outline-none rounded"
                    onClick={() => setDisabled(!disabled)}
                  >
                    Edit <AiFillEdit className="text-xl" />
                  </button>
                </div>
                {/* user details */}
                <div className="flex flex-col items-end flex-grow">
                  <span className="text-xl font-medium ">
                    {state.user && state.user.username}
                  </span>
                  <span className="text-xl text-gray-500">{state.code}</span>
                  <span className="text-gray-500 ">
                    Subject: {state.user && state.subject}
                  </span>
                </div>

                {/* profile picture */}
                <div className="image w-20 h-20 border-2 border-gray-400 bg-white flex rounded-full items-center justify-center mx-4">
                  {state.user &&
                  state.user.photoUrl &&
                  state.user.photoUrl !== "" ? (
                    <img
                      className="rounded-full w-full h-full"
                      src={state.user && state.user.photoUrl}
                      alt=""
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <IoPerson className="text-5xl text-gray-300" />
                  )}
                </div>
              </div>

              <form className="row g-3 px-4" onSubmit={handleSubmit}>
                {/* names */}
                <div className="col-md-12 h-20">
                  <label htmlFor="inputName5" class="form-label">
                    Instructor Id
                  </label>
                  <input
                    disabled
                    type="text"
                    class="form-control text-gray-600"
                    id="inputName5"
                    value={state.code && state.code}
                  />
                </div>

                {/* old password */}
                <div className="col-md-12 h-20">
                  <label htmlFor="inputName5" class="form-label">
                    Old Password
                  </label>
                  <input
                    disabled={disabled}
                    type="password"
                    class="form-control"
                    id="inputName5"
                    value={passwords.old}
                    onChange={(e) =>
                      setPasswords({ ...passwords, old: e.target.value })
                    }
                  />
                </div>

                {/* new password */}
                <div className="col-md-12 h-20">
                  <label htmlFor="inputName5" class="form-label">
                    New Password
                  </label>
                  <input
                    disabled={disabled}
                    type="password"
                    class="form-control"
                    id="inputName5"
                    value={passwords.new}
                    onChange={(e) =>
                      setPasswords({ ...passwords, new: e.target.value })
                    }
                  />
                </div>

                {/* confirm new password */}
                <div className="col-md-12 h-20">
                  <label htmlFor="inputName5" class="form-label">
                    Confirm New Password
                  </label>
                  <input
                    disabled={disabled}
                    type="password"
                    class="form-control"
                    id="inputName5"
                    value={passwords.confirmNew}
                    onChange={(e) =>
                      setPasswords({ ...passwords, confirmNew: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={disabled}
                  className="btn bg-indigo-700 uppercase font-medium text-white lg:w-1/2 mx-auto py-2.5"
                >
                  Reset
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
