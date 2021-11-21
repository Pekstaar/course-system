import React, { useState } from "react";
import BreadCrumb from "../components/navbar/BreadCrumb";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";
import { toastError, toastSuccess } from "../components/toaster";

const StudentRegister = () => {
  const [state, setState] = useState({
    code: "SEEE-0001",
    course: "619754578d2df5cefa5a7c40",
    dob: "2004-07-22",
    email: "cruiz@email.com",
    firstName: "Peter",
    lastName: "Cruiz",
    location: "200 Donholm, Nairobi",
    phone: "0789112344",
  });
  const [schools, setSchools] = useState([]);
  const [courses, setCourses] = useState([]);

  // load School on mount
  React.useEffect(() => {
    const getSchools = () => {
      axios
        .get(`${process.env.REACT_APP_VAR_API}school/all`)
        .then((r) => {
          setSchools(r.data);
        })
        .catch((err) => toastError(err.message));
    };

    getSchools();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = "student";
    // create request on axios
    axios
      .post(`${process.env.REACT_APP_VAR_API}auth/register/student`, {
        username: `${state.firstName} ${state.lastName}`,
        email: state.email,
        phone: state.phone,
        location: state.location,
        role: role,
        code: state.code,
        status: "pending",
        dob: state.dob,
        course: state.course,
        password: `${role}${state.code}`,
      })
      .then((r) => {
        toastSuccess("StudentRegistered Successfully!");
      })
      .catch((err) => toastError(err.response.data));
  };

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className=" h-full mt-14 py-2" style={{ marginLeft: "300px" }}>
        <BreadCrumb location="Admin/Students/RegisterStudent" />
        <div className="w-full px-4 ">
          {/* fields: firstname, lastname, email, dob, phoneno,location address,school,course,level */}
          {/* registration form */}
          <div class="card">
            <h5 class="card-title mx-4">register student</h5>
            <div class="card-body">
              <form class="row g-3" onSubmit={handleSubmit}>
                {/* first half */}
                <div className="col-6">
                  {/* names */}
                  <div class="col-md-12 h-20 ">
                    <label for="inputName5" class="form-label">
                      Firstname
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputName5"
                      value={state.firstName}
                      onChange={(e) =>
                        setState({ ...state, firstName: e.target.value })
                      }
                    />
                  </div>
                  <div class="col-md-12 h-20 ">
                    <label for="inputName5" class="form-label">
                      Lastname
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputName5"
                      value={state.lastName}
                      onChange={(e) =>
                        setState({ ...state, lastName: e.target.value })
                      }
                    />
                  </div>

                  {/* email */}
                  <div class="col-md-12 h-20 ">
                    <label for="inputEmail5" class="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      class="form-control"
                      id="inputEmail5"
                      value={state.email}
                      onChange={(e) =>
                        setState({ ...state, email: e.target.value })
                      }
                    />
                  </div>

                  {/* date of birth */}
                  <div class="col-md-12 h-20 ">
                    <label for="inputEmail5" class="form-label">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      class="form-control"
                      value={state.dob}
                      onChange={(e) =>
                        setState({ ...state, dob: e.target.value })
                      }
                    />
                  </div>

                  {/* phone number */}
                  <div class="col-md-12 h-20 ">
                    <label for="inputEmail5" class="form-label">
                      phone no.
                    </label>
                    <input
                      type="number"
                      required
                      class="form-control"
                      value={state.phone}
                      onChange={(e) =>
                        setState({ ...state, phone: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* <second half starts here /> */}
                <div className="col-md-6">
                  {/* location address */}
                  <div class="col-md-12 h-20 ">
                    <label for="inputAddress5" class="form-label">
                      School Id
                    </label>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        className="form-control "
                        id="inputAddres5s"
                        placeholder="student id"
                        value={state.code}
                        onChange={(e) =>
                          setState({ ...state, code: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  {/* location address */}
                  <div class="col-md-12 h-20 ">
                    <label for="inputAddress5" class="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputAddres5s"
                      placeholder="1204 town city"
                      value={state.location}
                      onChange={(e) =>
                        setState({ ...state, location: e.target.value })
                      }
                    />
                  </div>

                  {/* School of study */}
                  <div class="col-md-12 h-20  ">
                    <label class="col-sm-2 col-form-label">School</label>
                    {/* <div class="col-sm-10"> */}
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      // value={schoolSelected}
                      onChange={(e) => {
                        setCourses(
                          schools.filter((s) => s._id === e.target.value)[0]
                            .courses
                        );
                      }}
                    >
                      <option selected>--select school of study--</option>
                      {schools.map((s) => (
                        <option value={s._id} key={s._id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    {/* </div> */}
                  </div>

                  {/* course of study */}
                  <div class="col-md-12 h-20  ">
                    <label class="col-sm-2 col-form-label">Course </label>
                    {/* <div class="col-sm-10"> */}
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      value={state.course}
                      onChange={(e) =>
                        setState({ ...state, course: e.target.value })
                      }
                    >
                      <option selected>--select Course of study--</option>
                      {courses &&
                        courses.map((s) => (
                          <option value={s._id} key={s._id}>
                            {s.name}
                          </option>
                        ))}
                    </select>
                    {/* </div> */}
                  </div>
                </div>

                <button
                  type="submit"
                  class="btn bg-primary bg-indigo-700 text-white lg:w-1/2 mx-auto py-2.5"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentRegister;
