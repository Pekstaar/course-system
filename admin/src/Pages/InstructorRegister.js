import React, { useState } from "react";
import BreadCrumb from "../components/navbar/BreadCrumb";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
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

const InstructorRegister = () => {
  const [state, setState] = useState({
    code: "INST-001",
    course: "",
    email: "owira@email.com",
    subject: "",
    firstName: "Daniel",
    lastName: "Owira",
    location: "200, Dandora, Nairobi",
    phone: "0789663211",
    units: [],
  });
  const [schools, setSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState({});

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
        subject: state.subject,
        code: state.code,
        status: "active",
        units: state.units,
        password: `${role}${state.code}`,
      })
      .then((r) => {
        toastSuccess(`${state.firstName} Registered Successfully!`);
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
              <form class="row g-3" onSubmit={handleSubmit}>
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

                  {/* phone number */}
                  <div class="col-md-12 h-20">
                    <label for="inputEmail5" class="form-label">
                      Subject to Teach
                    </label>
                    <input
                      type="number"
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
                  {/* location address */}
                  <div class="col-md-12 h-20">
                    <label for="inputAddress5" class="form-label">
                      ID
                    </label>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        className="form-control"
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
                    Select faculty
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorRegister;
