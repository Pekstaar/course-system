import React, { useContext, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";
import { toastError, toastSuccess } from "../components/toaster";

import { IoPerson } from "react-icons/io5";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Context } from "../context/Context";

const ManageProfile = () => {
  const { initState, setInitState } = useContext(Context);
  const [state, setState] = useState({});
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(
    initState.auth.user && initState.auth.user.username.split(" ")[0]
  );
  const [lastName, setLastName] = useState(
    initState.auth.user && initState.auth.user.username.split(" ")[1]
  );

  // load School on mount
  React.useEffect(() => {
    setState(initState.auth);
  }, [initState]);

  // check if one is authenticated
  React.useEffect(() => {
    !initState.auth && navigate("/login");
  }, [initState.auth, navigate]);
  //   const [selectedSchool, setSelectedSchool] = useState({});

  const [disabled, setDisabled] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you wanna update details?")) {
      axios
        .put(
          `${process.env.REACT_APP_VAR_API}instructor/${initState.auth._id}`,
          {
            ...state,
          }
        )
        .then(async (r) => {
          toastSuccess(`${state.user.username} Registered Successfully!`);
          const updatedInstructorDetails = await axios.get(
            `${process.env.REACT_APP_VAR_API}instructor/${state._id}`
          );

          setInitState({ auth: updatedInstructorDetails.data });
        })
        .catch((err) => toastError(err.message));
    }
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div classNameName=" h-full py-2" style={{ marginLeft: "300px" }}>
        <div classNameName="w-full px-4 ">
          {/* fields: firstname, lastname, email, dob, phoneno,location address,school,course,level */}
          {/* registration form */}
          <div className="card mt-16">
            <h5 className="card-title mx-4 uppercase text-xl">
              Manage Profile
            </h5>
            <div className="card-body mx-auto lg:w-10/12">
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
                    Firstname
                  </label>
                  <input
                    disabled={disabled}
                    type="text"
                    class="form-control"
                    id="inputName5"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setState({
                        ...state,
                        user: {
                          ...state.user,
                          username: `${e.target.value} ${lastName}`,
                        },
                      });
                    }}
                  />
                </div>
                <div class="col-md-12 h-20">
                  <label htmlFor="inputName5" class="form-label">
                    Lastname
                  </label>
                  <input
                    disabled={disabled}
                    type="text"
                    class="form-control"
                    id="inputName5"
                    value={lastName && lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setState({
                        ...state,
                        user: {
                          ...state.user,
                          username: `${firstName} ${e.target.value}`,
                        },
                      });
                    }}
                  />
                </div>

                {/* email */}
                <div class="col-md-12 h-20">
                  <label htmlFor="inputEmail5" class="form-label">
                    Email
                  </label>
                  <input
                    disabled={disabled}
                    type="email"
                    required
                    class="form-control"
                    id="inputEmail5"
                    value={state.user && state.user.email}
                    onChange={(e) =>
                      setState({
                        ...state,
                        user: { ...state.user, email: e.target.value },
                      })
                    }
                  />
                </div>

                {/* phone number */}
                <div class="col-md-12 h-20">
                  <label htmlFor="inputEmail5" class="form-label">
                    phone no.
                  </label>
                  <input
                    disabled={disabled}
                    type="number"
                    required
                    class="form-control"
                    value={state.user && state.user.phone}
                    onChange={(e) =>
                      setState({
                        ...state,
                        user: { ...state.user, phone: e.target.value },
                      })
                    }
                  />
                </div>

                {/* location address */}
                <div className="col-md-12 h-20">
                  <label htmlFor="inputAddress5" class="form-label">
                    Location
                  </label>
                  <input
                    disabled={disabled}
                    type="text"
                    class="form-control"
                    id="inputAddres5s"
                    placeholder="1204 town city"
                    value={state.user && state.user.location}
                    onChange={(e) =>
                      setState({
                        ...state,
                        user: { ...state.user, location: e.target.value },
                      })
                    }
                  />
                </div>

                {/* photo address */}
                <div className="col-md-12 h-20">
                  <label className="form-label">Input photo url</label>
                  <input
                    disabled={disabled}
                    type="text"
                    className="form-control"
                    placeholder="http://img.jpg"
                    value={state.user && state.user.photoUrl}
                    onChange={(e) =>
                      setState({
                        ...state,
                        user: { ...state.user, photoUrl: e.target.value },
                      })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={disabled}
                  className="btn bg-indigo-700 uppercase font-medium text-white lg:w-1/2 mx-auto py-2.5"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageProfile;
