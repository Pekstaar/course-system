import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BreadCrumb from "../components/navbar/BreadCrumb";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Context } from "../context/Context";
import { useNavigate } from "react-router";
import axios from "axios";
import { toastError } from "../components/toaster";

const ManageCourse = () => {
  const { initState } = useContext(Context);
  const navigate = useNavigate();

  const [courses, setCourses] = React.useState([]);

  // fetch courses on mount
  React.useEffect(() => {
    const fetchCourses = () => {
      axios
        .get("http://localhost:8081/api/course/all")
        .then((r) => r.data && setCourses(r.data))
        .catch((err) => err.response && toastError(err.response.data));
    };
    fetchCourses();
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
        <BreadCrumb location="Admin/Courses" />
        <div class="card mx-3">
          <div class="card-body">
            <h5 class="card-title">Courses Manager</h5>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption className="ml-20">Manage Courses</caption>
                <TableHead>
                  <TableRow className="bg-indigo-100">
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Course Name</TableCell>
                    <TableCell align="center" className="uppercase">
                      School Of
                    </TableCell>
                    <TableCell align="center" className="uppercase">
                      No. of Units
                    </TableCell>
                    {/* <TableCell align="center" className="uppercase">
                      Level
                    </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody className="bg-gray-50">
                  {courses.map((c) => (
                    <TableRow key={c._id}>
                      <TableCell align="center" component="th" scope="row">
                        {c.code}
                      </TableCell>
                      <TableCell align="center">{c.name}</TableCell>
                      <TableCell align="center">{c.school.code}</TableCell>
                      <TableCell align="center">{c.units.length}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageCourse;
