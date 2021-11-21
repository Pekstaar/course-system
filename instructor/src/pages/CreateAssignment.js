import React, { useContext, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";
import { toastError, toastSuccess } from "../components/toaster";

import { IoPerson } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Context } from "../context/Context";
import BreadCrumb from "../components/navbar/BreadCrumb";

const CreateAssignment = () => {
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
    //
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

      <div classNameName=" h-full py-2 " style={{ marginLeft: "300px" }}>
        <div className="mt-14 ">
          <BreadCrumb location="instructor/assignment/CreateAssignment" />
        </div>
        <div classNameName="w-full px-4 ">
          {/* fields: firstname, lastname, email, dob, phoneno,location address,school,course,level */}
          {/* registration form */}
          <div className="card ">
            <h5 className="card-title mx-4 uppercase text-xl">
              Reset Password
            </h5>
            <div className="card-body px-20">
              <form className="row g-3 " onSubmit={handleSubmit}>
                {/* names */}
                <div className="col-md-12 h-20">
                  <label htmlFor="inputName5" class="form-label">
                    Topic
                  </label>
                  <input
                    disabled
                    type="text"
                    class="form-control text-gray-600"
                    id="inputName5"
                    value={state.code && state.code}
                  />
                </div>

                {/* Deadline */}
                <div className="row mb-3">
                  <label htmlFor="inputDate" class="col-sm-2 col-form-label">
                    Deadline
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="date"
                      className="form-control"
                      value={state.deadline}
                      onChange={(e) =>
                        setState({ ...state, deadline: e.target.value })
                      }
                    />
                  </div>
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

export default CreateAssignment;
