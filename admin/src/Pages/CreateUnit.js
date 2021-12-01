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

const CreateUnit = () => {
  const [courses, setCourses] = React.useState([]);
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [cos, setCos] = React.useState("");

  const { initState } = useContext(Context);
  const navigate = useNavigate();

  // load

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/api/unit", {
        code: id,
        name,
        course: cos._id,
      })
      .then(() => toastSuccess(name, " created Successfully!"))
      .catch((err) => toastError(err.response && err.response.data));

    // set all fields empty
    setId("");
    setCos("");
    setName("");
  };

  React.useEffect(() => {
    const getCourses = () => {
      axios
        .get("http://localhost:8081/api/course/all")
        .then((response) => response.data && setCourses(response.data))
        .catch((err) => toastError(err.response && err.response.data));
    };

    getCourses();
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
        <BreadCrumb location="Admin/Units/CreateUnit" />

        <div class="card mx-3">
          <h5 class="card-title underline mx-4">Create Course</h5>

          {/* create faculty form: */}
          <div class="card-body">
            {/* <!-- Vertical Form --> */}
            <form class="row g-3" onSubmit={handleSubmit}>
              {/* Abbr faculty id */}
              <div class="col-12">
                <label for="inputNanme4" class="form-label">
                  Unit ID
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="input the Unit abbreviations"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>

              {/* Faculty name */}
              <div class="col-12">
                <label for="inputNanme4" class="form-label">
                  Unit Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputNanme4"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* parent Course  */}
              <div class="col-md-12 h-20 ">
                <InputLabel id="demo-multiple-chip-label">
                  Select Course
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  value={cos}
                  onChange={(e) => setCos(e.target.value)}
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
                      <Chip key={cos._id} label={cos.code} />
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
                  {courses &&
                    courses.map((f) => (
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

              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-primary col-md-6 p-2.5 uppercase"
                >
                  create Unit
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

export default CreateUnit;
