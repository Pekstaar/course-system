import React, { useContext, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";
import { TextField, TextareaAutosize } from "@mui/material";

import { toastError, toastSuccess } from "../components/toaster";

import { useNavigate } from "react-router";
import { Context } from "../context/Context";
import BreadCrumb from "../components/navbar/BreadCrumb";

const CreateAssignment = () => {
  const { initState } = useContext(Context);
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [type, setType] = useState("");
  const [unit, setUnit] = useState("");

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [units, setUnits] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "buwwzyxv");

    await axios
      .post("https://api.cloudinary.com/v1_1/dnqawdmon/upload", formData)
      .then((r) => {
        axios
          .post(`http://localhost:8081/api/assignment`, {
            topic,
            description,
            unit,
            instructor: initState.auth._id,
            deadline,
            type: type,
            attachments: r.data.url,
          })
          .then((r) => {
            console.log(r.data);
            toastSuccess("Assignment Created Successfully!");
            setLoading(false);
          })
          .catch((err) => {
            toastError(err.message);
            setLoading(false);
          });
        // console.log(topic, description, deadline, type, r.data.url);
        setLoading(false);

        //
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  // check if one is authenticated
  React.useEffect(() => {
    if (initState.auth) {
      for (const u of initState.auth.units) {
        axios
          .get(`http://localhost:8081/api/unit/${u}`)
          .then((r) => {
            // if (units.includes(r.data.id)) {
            console.log("matching:");
            if (units.filter((u) => u._id === r.data._id).length === 0) {
              setUnits([...units, r.data]);
            }
            // }
          })
          .catch((err) => console.error(err.message));
      }
    }
    !initState.auth && navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initState.auth, navigate]);
  //   const [selectedSchool, setSelectedSchool] = useState({});

  return (
    <>
      <Navbar />
      <Sidebar />

      <div classNameName=" h-full py-2 " style={{ marginLeft: "300px" }}>
        <div className="mt-14 ">
          <BreadCrumb location="instructor/assignment/CreateAssignment" />
        </div>
        <div classNameName="w-full px-4 ">
          {/* fields: firstname, lastname, email, dob, phoneno,location address,school,course,level */}
          {/* registration form */}
          <div className="card ">
            <h5 className="card-title mx-4 uppercase text-xl">
              Create Assignment
            </h5>
            <div className="card-body px-20">
              <form className="row g-3 " onSubmit={handleSubmit}>
                {/* names */}
                <div className="col-md-12 h-20">
                  <label class="form-label">Topic</label>
                  <TextField
                    className="w-full"
                    id="demo-helper-text-aligned"
                    label="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div class=" ">
                  <label for="inputPassword" class="col-form-label">
                    Description
                  </label>
                  <div class="">
                    <TextareaAutosize
                      aria-label="minimum height"
                      className="form-control"
                      minRows={3}
                      placeholder="Minimum 3 rows"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                {/* Deadline */}
                <div className=" ">
                  <label htmlFor="inputDate" class="col-form-label">
                    Deadline
                  </label>

                  <TextField
                    className="w-full"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>

                {/* Types */}
                <div className=" ">
                  <label htmlFor="inputDate" class="col-form-label">
                    Assignment Type
                  </label>

                  <div class=" ">
                    <div class="">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option defaultValue>
                          ---Select Assignment type----
                        </option>
                        <option value="exam">Exam</option>
                        <option value="cat">Cat</option>
                        <option value="assignment">Assignment</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Units */}
                <div className=" ">
                  <label htmlFor="inputDate" class="col-form-label">
                    Assignment Unit
                  </label>

                  <div class=" ">
                    <div class="">
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                      >
                        <option defaultValue>---Select Unit ----</option>
                        {units.map((unit) => (
                          <option key={unit._id} value={unit._id}>
                            {unit.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* uploader */}
                <div className=" ">
                  <label htmlFor="inputDate" class="col-form-label">
                    Attachments
                  </label>
                  <div class="">
                    <input
                      disabled={loading}
                      class="form-control"
                      type="file"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                    />
                  </div>
                  {/* uploaded images */}
                  <div className="flex">
                    <div className="item">{/* image */}</div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn bg-indigo-700 uppercase font-medium text-white lg:w-1/2 mx-auto py-2.5"
                >
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAssignment;
