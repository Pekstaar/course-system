import React, { useState } from "react";
import axios from "axios";
import { toastError, toastSuccess } from "../components/toaster";

import { Link } from "react-router-dom";

const Signup = () => {
  const [nextIdNumber, setNextIdNumber] = useState(0);
  const [state, setState] = useState({
    course: "",
    email: "",
    firstName: "",
    lastName: "",
    location: "",
    pwd: "",
    phone: "",
    dob: "",
    code: `STUD-00${nextIdNumber}`,
  });

  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState({});

  //   const [course, setUnits] = useState([]);
  React.useEffect(() => {
    setState({ ...state, code: `STUD-00${nextIdNumber}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextIdNumber]);

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
    // get ids:
    axios
      .get(`${process.env.REACT_APP_VAR_API}students`)
      .then((r) => {
        r.data &&
          r.data.forEach((el) => {
            const id = Number(el.code.split("-")[1]);
            // const stringId = "00" + id;
            id > nextIdNumber && setNextIdNumber(id + 1);
          });
      })
      .catch((err) => console.log(err.message));
    getSchools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = "student";

    // check if passwords match:
    if (state.pwd === "" || state.confirmPassword === "") {
      toastError("Passwords required!");

      return;
    } else if (state.pwd !== state.confirmPassword) {
      toastError("Passwords do not match!");
      return;
    }

    // const code = "INST-00" + (Number(nextIdNumber) + 1);

    // create request on axios
    axios
      .post(`${process.env.REACT_APP_VAR_API}auth/register/student`, {
        username: `${state.firstName} ${state.lastName}`,
        email: state.email,
        phone: state.phone,
        location: state.location,
        role,
        code: state.code,
        status: "pending",
        password: state.pwd,
        course: state.course,
        dob: state.dob,
      })
      .then((r) => {
        toastSuccess(`${state.firstName} Registered Successfully!`);
      })
      .catch((err) => toastError(err.response.data));
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="lg:w-11/12 w-full bg-white my-3 py-4 px-2 sm:px-4 ">
          <h1 className="text-center font-medium uppercase text-xl sm:text-2xl text-gray-600 py-5 sm:py-10">
            Student SIGNUP
          </h1>
          <hr className=" mb-5" />
          <form class="row g-3 lg:px-5" onSubmit={handleSubmit}>
            {/* first half */}
            <div className="col-6">
              {/* ID */}
              <div class="col-md-12 h-20">
                <label for="inputEmail5" class="form-label">
                  Your school id is:
                </label>
                <input
                  type="text"
                  disabled
                  class="form-control"
                  value={state.code}
                />
              </div>
              {/* names */}
              <div class="col-md-12 h-20">
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
              <div class="col-md-12 h-20">
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
              <div class="col-md-12 h-20">
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

              {/* phone number */}
              <div class="col-md-12 h-20">
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

              {/* Date of Birth */}
              <div class="col-md-12 h-20">
                <label for="inputEmail5" class="form-label">
                  Date of Birth.
                </label>
                <input
                  type="date"
                  required
                  class="form-control"
                  value={state.dob}
                  onChange={(e) => setState({ ...state, dob: e.target.value })}
                />
              </div>
            </div>

            {/* <second half starts here /> */}
            <div className="col-md-6">
              {/* Password */}
              <div class="col-md-12 h-20">
                <label for="password" class="form-label">
                  Password
                </label>
                <div className="flex gap-1">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="password"
                    value={state.pwd}
                    onChange={(e) =>
                      setState({ ...state, pwd: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* confirm password */}
              <div class="col-md-12 h-20">
                <label for="inputAddress5" class="form-label">
                  Confirm Password
                </label>
                <div className="flex gap-1">
                  <input
                    type="password"
                    className="form-control"
                    id="inputAddres5s"
                    placeholder="confirm password"
                    // value={state.confirmPas}
                    onChange={(e) =>
                      setState({ ...state, confirmPassword: e.target.value })
                    }
                  />
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
                  value={state.location}
                  onChange={(e) =>
                    setState({ ...state, location: e.target.value })
                  }
                />
              </div>

              {/* School of teaching */}
              <div class="col-md-12 h-20 ">
                <label class="col-sm-2 col-form-label">Schools</label>
                {/* <div class="col-sm-10"> */}
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setSelectedSchool(
                      schools.filter((s) => s._id === e.target.value)[0]
                    )
                  }
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

              {/* Course of study */}
              <div class="col-md-12 h-20 ">
                <label class="col-sm-2 col-form-label">course</label>
                {/* <div class="col-sm-10"> */}
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={async (e) =>
                    setState({ ...state, course: e.target.value })
                  }
                >
                  <option selected>--select course of study--</option>
                  {selectedSchool.courses &&
                    selectedSchool.courses.map((c, i) => (
                      <option value={c._id} key={c._id}>
                        {c.name}
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

            {/* have no account link */}
            <Link
              as="span"
              to="/login"
              className=" text-center mt-4 py-2 w-full md:mx-0 md:w-4/6 text-gray-500 hover:underline"
            >
              already have an account? click here to login
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
