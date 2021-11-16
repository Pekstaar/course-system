import React from "react";
import BreadCrumb from "../components/navbar/BreadCrumb";

const CreateFaculty = () => {
  return (
    <>
      <BreadCrumb location="Admin/faculties/create" />

      <div class="card">
        <h5 class="card-title underline mx-4">Create Faculty</h5>

        {/* create faculty form: */}
        <div class="card-body">
          {/* <!-- Vertical Form --> */}
          <form class="row g-3">
            {/* Abbr faculty id */}
            <div class="col-12">
              <label for="inputNanme4" class="form-label">
                Faculty ID
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="input the faculty abbreviations"
              />
            </div>

            {/* Faculty name */}
            <div class="col-12">
              <label for="inputNanme4" class="form-label">
                Faculty Name
              </label>
              <input type="text" class="form-control" id="inputNanme4" />
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
    </>
  );
};

export default CreateFaculty;
