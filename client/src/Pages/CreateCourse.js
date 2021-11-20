import {
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import BreadCrumb from "../components/navbar/BreadCrumb";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/Context";
import axios from "axios";
import { toastError, toastSuccess } from "../components/toaster";

const CreateCourse = () => {
  // const faculties = [
  //   "Faculty of Engineering and the Built Environment",
  //   "Faculty of Social Sciences and Technology (FSST)",
  // ];

  const [schools, setSchools] = React.useState([]);
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  // const [faculty, setFaculty] = React.useState("");

  const [skul, setSkul] = React.useState();

  const { initState } = useContext(Context);
  const navigate = useNavigate();

  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // load

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/api/course", {
        code: id,
        name,
        school: skul._id,
      })
      .then(() => toastSuccess("School created successfully!"))
      .catch((err) => toastError(err.response.data));
  };

  React.useEffect(() => {
    const getFaculties = () => {
      axios
        .get("http://localhost:8081/api/school/all")
        .then((response) => response.data && setSchools(response.data))
        .catch((err) => toastError(err.response && err.response.data));
    };

    getFaculties();
  }, []);
  // check if one is authenticated
  React.useEffect(() => {
    !initState.auth && navigate("/login");
  }, [initState.auth, navigate]);
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className=" h-full mt-14 py-2" style={{ marginLeft: "300px" }}>
        <BreadCrumb location="Admin/courses/CreateCourse" />

        <div class="card mx-3">
          <h5 class="card-title underline mx-4">Create Course</h5>

          {/* create faculty form: */}
          <div class="card-body">
            {/* <!-- Vertical Form --> */}
            <form class="row g-3" onSubmit={handleSubmit}>
              {/* Abbr faculty id */}
              <div class="col-12">
                <label for="inputNanme4" class="form-label">
                  Course ID
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="input the Course abbreviations"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>

              {/* Faculty name */}
              <div class="col-12">
                <label for="inputNanme4" class="form-label">
                  Course Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputNanme4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Schools under faculty */}
              <div class="col-md-12 h-20 ">
                <InputLabel id="demo-multiple-chip-label">
                  Select School
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  value={skul}
                  onChange={(e) => setSkul(e.target.value)}
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
                      <Chip key={skul._id} label={skul.code} />
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
                  {schools &&
                    schools.map((f) => (
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

              {/* Course Level */}
              <div class="col-md-12 h-20 ">
                <InputLabel id="demo-multiple-chip-label">
                  Select Level
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  value={personName}
                  onChange={handleChange}
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
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
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
                  {schools.map((name, id) => (
                    <MenuItem
                      key={id}
                      value={name}
                      //   style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-primary col-md-6 p-2.5 uppercase"
                >
                  create School
                </button>
              </div>
            </form>
          </div>
          {/* <!-- Vertical Form --> */}
        </div>
      </div>
    </>
  );
};

export default CreateCourse;
