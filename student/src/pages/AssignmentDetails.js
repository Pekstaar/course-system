import axios from "axios";
import React, { useContext } from "react";
import { useParams } from "react-router";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import PrivateRouter from "../PrivateRouter";
import { AiFillFileText } from "react-icons/ai";
import Uploader from "../components/Uploader";
import { toastError, toastSuccess } from "../components/toaster";
import CircularStatic from "../components/progress";
import { Context } from "../context/Context";

const AssignmentDetails = () => {
  const { initState } = useContext(Context);
  const { id } = useParams();

  const [assignment, setAssignment] = React.useState({});
  const [files, setFiles] = React.useState();
  const [progress, setProgress] = React.useState(0);

  //   upload function
  const upload = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "buwwzyxv");

    const options = {
      onUploadProgress: (progress) => {
        const { loaded, total } = progress;
        let percent = Math.floor((loaded * 100) / total);
        setProgress(percent);
      },
    };

    await axios
      .post(
        "https://api.cloudinary.com/v1_1/dnqawdmon/upload",
        formData,
        options
      )
      .then((r) => {
        toastSuccess("File uploaded successfully!");
        axios
          .post(`${process.env.REACT_APP_VAR_API}submit`, {
            sender: initState.auth._id,
            assignment: assignment._id,
            attachment: r.data.url,
          })
          .then((r) => {
            setProgress(0);
            console.log(r.data.url);
            toastSuccess("Assignment Submitted!");
          })
          .catch((err) => {
            toastError(err.message);
            setProgress(0);
          });
      })

      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    const getAssignment = () => {
      axios
        .get(`${process.env.REACT_APP_VAR_API}assignment/${id}`)
        .then((r) => setAssignment(r.data))
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
                  <p className="text-base">{assignment && assignment.topic}</p>
                </div>

                <div className="topic flex flex-col justify-center gap-2 my-3">
                  <div className="font-bold">Description:</div>
                  <p className="text">{assignment && assignment.description}</p>
                </div>
                <div className="topic flex flex-col justify-center gap-2 my-3">
                  <div className="font-bold">Submit before:</div>
                  <p className="text">{assignment && assignment.deadline}</p>
                </div>

                <div className="topic flex flex-col justify-center gap-2 my-3">
                  <div className="font-bold">Type of Assignment:</div>
                  <p className="text">{assignment && assignment.type}</p>
                </div>

                <div className="topic flex flex-col justify-center gap-2 my-3">
                  <div className="font-bold">Unit:</div>
                  <p className="text">
                    {assignment && assignment.unit && assignment.unit.name}
                  </p>
                </div>

                <div className="topic flex flex-col justify-center gap-2 my-3">
                  <div className="font-bold">Attachments:</div>
                  {assignment?.attachments?.map((a) => (
                    <a
                      href={a}
                      className="w-52 p-1 shadow-xl flex flex-col items-center"
                    >
                      {/* card */}
                      <div className="">
                        <AiFillFileText className="text-8xl" />
                      </div>
                      {a.split("/").slice(-1)}
                    </a>
                  ))}
                </div>
              </div>
              {/* second half */}
              <div className="md:w-1/2">
                <CircularStatic progress={progress} />
                <Uploader setFile={setFiles} />

                {/* files to upload */}
                {files && (
                  <div className="w-52 p-1 shadow-xl flex flex-col items-center">
                    {/* card */}
                    <div className="">
                      <AiFillFileText className="text-7xl" />
                    </div>
                    {files && files[0].name}
                  </div>
                )}

                {/* submit button */}
                <div className="submit">
                  <button
                    className="btn bg-indigo-700 text-white mx-auto my-3"
                    onClick={upload}
                  >
                    Upload Assignment
                  </button>
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

export default AssignmentDetails;
