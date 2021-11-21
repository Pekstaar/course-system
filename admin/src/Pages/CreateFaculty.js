import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import BreadCrumb from "../components/navbar/BreadCrumb";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { toastError, toastSuccess } from "../components/toaster";
import { Context } from "../context/Context";

const CreateFaculty = () => {
  const { initState } = useContext(Context);
  const navigate = useNavigate();

  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // create faculty
    axios
      .post("http://localhost:8081/api/faculty", {
        code: id,
        name,
      })
      .then((r) => toastSuccess(`${r.data.name} successfully created!`))
      .catch((err) => toastError(err.response.data));

    // / make fields empty!
    setId("");
    setName("");
  };

  // check if one is authenticated
  React.useEffect(() => {
    !initState.auth && navigate("/login");
  }, [initState.auth, navigate]);
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className=" h-full mt-14 py-2" style={{ marginLeft: "300px" }}>
        <BreadCrumb location="Admin/faculties/create" />

        <div class="card mx-3">
          <h5 class="card-title underline mx-4">Create Faculty</h5>

          {/* create faculty form: */}
          <div class="card-body">
            {/* <!-- Vertical Form --> */}
            <form class="row g-3" onSubmit={handleSubmit}>
              {/* Abbr faculty id */}
              <div class="col-12">
                <label for="inputNanme4" class="form-label">
                  Faculty ID
                </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="input the faculty abbreviations"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>

              {/* Faculty name */}
              <div class="col-12">
                <label for="inputNanme4" class="form-label">
                  Faculty Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div class="text-center">
                <button
                  type="submit"
                  class="btn btn-primary col-md-6 p-2.5 uppercase"
                >
                  create faculty
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

export default CreateFaculty;
