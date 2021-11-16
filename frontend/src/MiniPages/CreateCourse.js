import {
  Chip,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import BreadCrumb from "../components/navbar/BreadCrumb";

const CraeteSchool = () => {
  const faculties = [
    "Faculty of Engineering and the Built Environment",
    "Faculty of Social Sciences and Technology (FSST)",
  ];

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
  return (
    <>
      <BreadCrumb location="Admin/courses/CreateCourse" />

      <div class="card">
        <h5 class="card-title underline mx-4">Create Course</h5>

        {/* create faculty form: */}
        <div class="card-body">
          {/* <!-- Vertical Form --> */}
          <form class="row g-3">
            {/* Abbr faculty id */}
            <div class="col-12">
              <label for="inputNanme4" class="form-label">
                Course ID
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="input the School abbreviations"
              />
            </div>

            {/* Faculty name */}
            <div class="col-12">
              <label for="inputNanme4" class="form-label">
                Course Name
              </label>
              <input type="text" class="form-control" id="inputNanme4" />
            </div>

            {/* Schools under faculty */}
            <div class="col-md-12 h-20 ">
              <InputLabel id="demo-multiple-chip-label">
                Select faculty
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
                {faculties.map((name, id) => (
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
                {faculties.map((name, id) => (
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
    </>
  );
};

export default CraeteSchool;
