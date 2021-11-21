import {
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import BreadCrumb from "../components/navbar/BreadCrumb";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { toastError, toastSuccess } from "../components/toaster";
import { Context } from "../context/Context";

const CreateSchool = () => {
  // const faculties = [
  //   "Faculty of Engineering and the Built Environment",
  //   "Faculty of Social Sciences and Technology (FSST)",
  // ];
  const { initState } = useContext(Context);
  const navigate = useNavigate();

  // check if one is authenticated
  React.useEffect(() => {
    !initState.auth && navigate("/login");
  }, [initState.auth, navigate]);

  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [fac, setFac] = React.useState("");

  const [faculties, setFaculties] = React.useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8081/api/school", {
        code: id,
        name,
        faculty: fac._id,
      })
      .then(() => toastSuccess("School created successfully!"))
      .catch((err) => toastError(err.response.data));
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:8081/api/faculty/all")
      .then((r) => setFaculties(r.data))
      .catch((err) => toastError(err.response && err.response.data));
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className=" h-full mt-14 py-2" style={{ marginLeft: "300px" }}>
        <BreadCrumb location="Admin/schools/CreateSchool" />

        <div class="card mx-3">
          <h5 class="card-title underline mx-4">Create School</h5>

          {/* create faculty form: */}
          <div class="card-body">
            {/* <!-- Vertical Form --> */}
            <form class="row g-3" onSubmit={handleSubmit}>
              {/* Abbr faculty id */}
              <div class="col-12">
                <label for="inputNanme4" class="form-label">
                  School ID
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="input the School abbreviations"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>

              {/* Faculty name */}
              <div class="col-12">
                <label for="inputNanme4" class="form-label">
                  School Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/*  faculty */}
              <div class="col-md-12 h-20 ">
                <InputLabel id="demo-multiple-chip-label">
                  Select faculty
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  value={fac}
                  onChange={(e) => setFac(e.target.value)}
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
                      <Chip key={fac._id} label={fac.name} />
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
                  {faculties &&
                    faculties.map((f) => (
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

export default CreateSchool;
