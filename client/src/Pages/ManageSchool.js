import React, { useContext } from "react";
import BreadCrumb from "../components/navbar/BreadCrumb";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Context } from "../context/Context";
import { useNavigate } from "react-router";
import axios from "axios";
import { toastError, toastSuccess } from "../components/toaster";
import { AiFillDelete } from "react-icons/ai";
import ScaleLoader from "react-spinners/ScaleLoader";

const ManageSchool = () => {
  const { initState } = useContext(Context);
  const navigate = useNavigate();

  const [schools, setSchools] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const deleteFaculty = (id) => {
    if (window.confirm("Are you sure you want to delete faculty?")) {
      // filter item out of array
      const newArray = schools.filter((r) => r._id !== id);
      setSchools(newArray);

      // delete request
      axios
        .delete(`http://localhost:8081/api/school/${id}`)
        .then(() => toastSuccess("Faculty Deleted Successfully!"))
        .catch((e) => toastError(e.response.data));
    }
  };

  // load schoools from database useEffect
  React.useEffect(() => {
    setLoading(true);

    const getSchools = () => {
      axios
        .get("http://localhost:8081/api/school/all")
        .then((r) => {
          r.data && setSchools(r.data);
          setLoading(false);
        })
        .catch((err) => {
          toastError(err.response && err.response.data);
          setLoading(false);
        });
    };

    getSchools();
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
        <BreadCrumb location="Admin/Schools" />

        {loading ? (
          <div
            className="  flex items-center justify-center"
            style={{ height: "500px" }}
          >
            <ScaleLoader
              color={"#6366F1"}
              loading={loading}
              height={60}
              width={5}
              margin={3}
            />
          </div>
        ) : (
          <div className="w-full px-4 ">
            {/* body */}
            {/* registration form */}
            <div class="card">
              <h5 class="card-title mx-4">Manage Schools</h5>
              <div class="card-body">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="caption table">
                    <caption className="ml-20">Manage Schools</caption>
                    <TableHead>
                      <TableRow className="bg-indigo-100">
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center" className="uppercase">
                          School Of
                        </TableCell>

                        <TableCell align="center" className="uppercase">
                          Faculty
                        </TableCell>

                        <TableCell align="center" className="uppercase">
                          Courses offered
                        </TableCell>

                        <TableCell align="center" className="uppercase">
                          Actions
                        </TableCell>

                        {/* <TableCell align="center" className="uppercase">
                        Total Students
                      </TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody className="bg-gray-50">
                      {schools &&
                        schools.map((s) => (
                          <TableRow key={s._id}>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                            >
                              {s.code}
                            </TableCell>
                            <TableCell align="center">{s.name}</TableCell>
                            <TableCell align="center">
                              {s.faculty && s.faculty.code}
                            </TableCell>
                            <TableCell align="center">
                              {s.courses.length}
                            </TableCell>
                            <TableCell align="center ">
                              <button
                                className="bg-white py-1 px-2 rounded shadow-xl ml-8"
                                onClick={() => deleteFaculty(s._id)}
                              >
                                <AiFillDelete className="text-red-500 text-xl" />
                              </button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ManageSchool;
