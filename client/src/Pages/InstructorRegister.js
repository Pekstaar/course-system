import React, { useState } from "react";
import BreadCrumb from "../components/navbar/BreadCrumb";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";
import { toastError, toastSuccess } from "../components/toaster";

const InstructorRegister = () => {
  const [state, setState] = useState({
    code: "",
    course: "",
    email: "",
    firstName: "",
    lastName: "",
    location: "",
    phone: "",
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
    const role = "instructor";
    // create request on axios
    axios
      .post(`${process.env.REACT_APP_VAR_API}auth/register/instructor`, {
        username: `${state.firstName} ${state.lastName}`,
        email: state.email,
        phone: state.phone,
        location: state.location,
        role: role,
        code: state.code,
        status: "active",
        units: state.units,
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
        <BreadCrumb location="Admin/Instructors/RegisterInstructor" />

        <div className="w-full px-4 ">
          {/* fields: firstname, lastname, email, dob, phoneno,location address,school,course,level */}
          {/* registration form */}
          <div class="card">
            <h5 class="card-title mx-4">Register Instructor</h5>
            <div class="card-body">
              <form class="row g-3">
                {/* first half */}
                <div className="col-6">
                  {/* names */}
                  <div class="col-md-12 h-20">
                    <label for="inputName5" class="form-label">
                      Firstname
                    </label>
                    <input type="text" class="form-control" id="inputName5" />
                  </div>
                  <div class="col-md-12 h-20">
                    <label for="inputName5" class="form-label">
                      Lastname
                    </label>
                    <input type="text" class="form-control" id="inputName5" />
                  </div>

                  {/* email */}
                  <div class="col-md-12 h-20">
                    <label for="inputEmail5" class="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      class="form-control"
                      id="inputEmail5"
                    />
                  </div>

                  {/* phone number */}
                  <div class="col-md-12 h-20">
                    <label for="inputEmail5" class="form-label">
                      phone no.
                    </label>
                    <input type="number" required class="form-control" />
                  </div>
                </div>

                {/* <second half starts here /> */}
                <div className="col-md-6">
                  {/* location address */}
                  <div class="col-md-12 h-20">
                    <label for="inputAddress5" class="form-label">
                      ID
                    </label>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        className="form-control w-4/5"
                        id="inputAddres5s"
                        placeholder="student id"
                      />
                      <button className="btn btn-primary"> generate id</button>
                    </div>
                  </div>
                  {/* location address */}
                  <div class="col-md-12 h-20">
                    <label for="inputAddress5" class="form-label">
                      Location
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="inputAddres5s"
                      placeholder="1204 town city"
                    />
                  </div>

                  {/* School of teaching */}
                  <div class="col-md-12 h-20 ">
                    <label class="col-sm-2 col-form-label">Schools</label>
                    {/* <div class="col-sm-10"> */}
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>--select school to teach--</option>
                      {schools.map((s, i) => (
                        <option value="1" key={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {/* </div> */}
                  </div>

                  {/* unit to teach */}
                  <div class="col-md-12 h-20 ">
                    <label class="col-sm-2 col-form-label">Unit </label>
                    {/* <div class="col-sm-10"> */}
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>--select Course of study--</option>
                      {schools.map((s, i) => (
                        <option value="1" key={s}>
                          {s}
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

export default InstructorRegister;
