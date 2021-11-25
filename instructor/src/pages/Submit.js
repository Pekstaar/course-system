import axios from "axios";
import React from "react";
import { useParams } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import PrivateRouter from "../PrivateRouter";
import { AiFillFileText } from "react-icons/ai";
import { toastError, toastSuccess } from "../components/toaster";

const Submit = () => {
  const { id } = useParams();

  const [assignment, setAssignment] = React.useState({});
  const [grade, setGrade] = React.useState(0);

  //   upload function
  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .put(`${process.env.REACT_APP_VAR_API}submit`, {
        id: assignment._id,
        verified: true,
        grade: grade,
      })
      .then((r) => {
        toastSuccess("Assignment graded successfully!");
      })
      .catch((err) => {
        toastError(err.message);
      });
  };

  React.useEffect(() => {
    const getAssignment = () => {
      axios
        .get(`${process.env.REACT_APP_VAR_API}submit/${id}`)
        .then((r) => {
          setAssignment(r.data);
          setGrade(r.data.grade);
        })
        .catch((err) => console.error(err.message));
    };

    getAssignment();
  }, [id]);
  return (
    <PrivateRouter>
      <Navbar />
      <Sidebar />

      <div classNameName=" h-full py-2" style={{ marginLeft: "300px" }}>
        <div className="mt-16"></div>
        <div classNameName="w-full px-4 ">
          {/* fields: firstname, lastname, email, dob, phoneno,location address,school,course,level */}
          {/* registration form */}
          <div className="card px-4">
            <h5 className="card-title mx-4 uppercase text-xl">
              View and submit assignment
            </h5>
            <div className="my-4 flex">
              {/* first half */}
              <div className="md:w-1/2">
                <div className="topic flex flex-col justify-center gap-2 my-2">
                  <div className="font-bold">Topic:</div>
                  <p className="text-base">
                    {assignment &&
                      assignment.assignment &&
                      assignment.assignment.topic}
                  </p>
                </div>

                <div className="topic flex flex-col justify-center gap-2 my-3">
                  <div className="font-bold">Description:</div>
                  <p className="text">
                    {assignment &&
                      assignment.assignment &&
                      assignment.assignment.description}
                  </p>
                </div>
                <div className="topic flex flex-col justify-center gap-2 my-3">
                  <div className="font-bold">Submit before:</div>
                  <p className="text">
                    {assignment &&
                      assignment.assignment &&
                      assignment.assignment.deadline}
                  </p>
                </div>

                <div className="topic flex flex-col justify-center gap-2 my-3">
                  <div className="font-bold">Type of Assignment:</div>
                  <p className="text">
                    {assignment &&
                      assignment.assignment &&
                      assignment.assignment.type}
                  </p>
                </div>

                <div className="topic flex flex-col justify-center gap-2 my-3">
                  <div className="font-bold">Unit:</div>
                  <p className="text">
                    {assignment &&
                      assignment.unit &&
                      assignment.assignment.unit.name}
                  </p>
                </div>

                <div className="topic flex flex-col justify-center gap-2 my-3 ">
                  <div className="font-bold">Attachments:</div>
                  <a
                    href={assignment.attachment && assignment.attachment}
                    className="w-52 p-1 shadow-xl flex flex-col items-center overflow-x-hidden"
                  >
                    {/* card */}
                    <div className="">
                      <AiFillFileText className="text-8xl" />
                    </div>
                    {assignment.assignment &&
                      assignment.attachment.split("/").slice(-1)}
                  </a>
                </div>
              </div>
              {/* second half */}
              <div className="md:w-1/2">
                {/* submit button */}
                <div className="submit">
                  <form action="" onSubmit={handleSubmit}>
                    <div className="col-md-12 h-20">
                      <label htmlFor="inputName5" class="form-label">
                        Grade Assignment
                      </label>
                      <input
                        disabled={false}
                        type="Number"
                        class="form-control"
                        id="inputName5"
                        placeholder="input grade in %"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                      />
                    </div>

                    <button
                      className="btn bg-indigo-700 text-white mx-auto my-3"
                      type="submit"
                    >
                      Assign Grade
                    </button>
                  </form>
                </div>
              </div>
              <uploader />
            </div>
          </div>
        </div>
      </div>
    </PrivateRouter>
  );
};

export default Submit;
