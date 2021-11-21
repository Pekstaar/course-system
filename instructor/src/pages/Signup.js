import React, { useState } from "react";
import axios from "axios";
import { toastError, toastSuccess } from "../components/toaster";
import {
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Signup = () => {
  const [state, setState] = useState({
    code: "",
    course: "",
    email: "",
    subject: "",
    firstName: "",
    lastName: "",
    location: "",
    phone: "",
    units: [],
  });

  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState({});

  const [nextIdNumber, setNextIdNumber] = useState(0);

  const [units, setUnits] = useState([]);

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
      .get(`${process.env.REACT_APP_VAR_API}instructor`)
      .then((r) => {
        r.data.forEach((el) => {
          const id = Number(el.code.split("-")[1]);
          // const stringId = "00" + id;
          id > nextIdNumber && setNextIdNumber(id);
        });

        console.log(nextIdNumber);
      })
      .catch((err) => toastError(err.message));

    getSchools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const role = "instructor";

    // check if passwords match:
    if (state.pwd === "" || state.confirmPassword === "") {
      toastError("Passwords required!");
      return;
    } else if (state.pwd !== state.confirmPassword) {
      toastError("Passwords do not match!");
      return;
    }

    const code = "INST-00" + (Number(nextIdNumber) + 1);

    // create request on axios
    axios
      .post(`${process.env.REACT_APP_VAR_API}auth/register/instructor`, {
        username: `${state.firstName} ${state.lastName}`,
        email: state.email,
        phone: state.phone,
        location: state.location,
        role,
        subject: state.subject,
        code,
        status: "pending",
        units: state.units,
        password: state.pwd,
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
            Instructor SIGNUP
          </h1>
          <hr className=" mb-5" />
          <form class="row g-3 lg:px-5" onSubmit={handleSubmit}>
            {/* first half */}
            <div className="col-6">
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

              {/* Subject */}
              <div class="col-md-12 h-20">
                <label for="inputEmail5" class="form-label">
                  Subject to Teach
                </label>
                <input
                  type="text"
                  required
                  class="form-control"
                  value={state.subject}
                  onChange={(e) =>
                    setState({ ...state, subject: e.target.value })
                  }
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
                  <option selected>--select school to teach--</option>
                  {schools.map((s) => (
                    <option value={s._id} key={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                {/* </div> */}
              </div>

              {/* Course of teaching */}
              <div class="col-md-12 h-20 ">
                <label class="col-sm-2 col-form-label">course</label>
                {/* <div class="col-sm-10"> */}
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={async (e) => {
                    // get units of this selected course
                    const { data } = await axios.get(
                      `${process.env.REACT_APP_VAR_API}course/${e.target.value}`
                    );
                    setUnits(data.units);
                  }}
                >
                  <option selected>--select school to teach--</option>
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

            {/* unit to teach */}
            <div class="col-md-12 h-20 ">
              <InputLabel id="demo-multiple-chip-label">
                Select Units to teach
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                value={state.units}
                onChange={(e) =>
                  setState({
                    ...state,
                    units: [...state.units, e.target.value],
                  })
                }
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="school under faculty"
                    className="w-full"
                    placeholder="select schools under this faculty"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value, i) => (
                      <Chip key={i} label={value.code} />
                    ))}
                  </Box>
                )}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  },
                }}
              >
                {units &&
                  units.map((f) => (
                    <MenuItem
                      key={f._id}
                      value={f}
                      //   style={getStyles(name, personName, theme)}
                    >
                      {f.name}
                    </MenuItem>
                  ))}
              </Select>
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
