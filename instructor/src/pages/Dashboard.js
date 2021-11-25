import React, { useContext, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../components/navbar/BreadCrumb";
import Card from "../components/Card";
import { AiFillBook } from "react-icons/ai";
import axios from "axios";

const Dashboard = () => {
  const { initState } = useContext(Context);
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);

  React.useEffect(() => {
    console.log(students);
  }, [students]);

  React.useEffect(() => {
    const fetchCourses = () => {
      initState.auth &&
        axios
          .get(`${process.env.REACT_APP_VAR_API}unit/some`, {
            units: initState.auth.units,
          })
          .then((r) => {
            // r.data && setUnits(r.data);
            // setLoading(false);
            setStudents(r.data);
          })
          .catch((err) => {
            // err.response && toastError(err.response.data);
            // setLoading(false);
          });
    };
    fetchCourses();
  }, [initState.auth]);

  // check if one is authenticated
  React.useEffect(() => {
    !initState.auth && navigate("/login");
  }, [initState.auth, navigate]);
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className=" h-full mt-14 py-2" style={{ marginLeft: "300px" }}>
        <BreadCrumb location="Instructor/Dashboard" />

        <div className="card p-3">
          <div className="flex justify-around mb-4">
            <Card
              number={initState.auth && initState.auth.units.length}
              icon={<AiFillBook className="text-indigo-300 text-3xl" />}
              text={"units"}
            />

            <Card
              number={17}
              icon={<AiFillBook className="text-indigo-300 text-3xl" />}
              text={"Students"}
            />

            <Card
              number={5}
              icon={<AiFillBook className="text-indigo-300 text-3xl" />}
              text={"Assignments"}
            />
          </div>

          {/*  */}
          <h5 className="text-xl my-2">Your Students:</h5>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
              <caption>Manage Students</caption>
              <TableHead>
                <TableRow className="bg-indigo-100">
                  <TableCell>ID</TableCell>
                  <TableCell align="center">Fullname</TableCell>
                  <TableCell align="center">Email</TableCell>
                  {/* <TableCell align="center">School</TableCell> */}
                  <TableCell align="center">Course</TableCell>
                  {/* <TableCell align="center">Level</TableCell> */}
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="bg-gray-50">
                {students &&
                  students.map((s) => (
                    <TableRow key={s.code}>
                      <TableCell component="th" scope="row">
                        {s.code}
                      </TableCell>
                      <TableCell align="center">{s.user.username}</TableCell>
                      <TableCell align="center">{s.user.email}</TableCell>
                      {/* <TableCell align="center">{s.school}</TableCell> */}
                      <TableCell align="center">{s.course.name}</TableCell>
                      {/* <TableCell align="center">{s.level}</TableCell> */}
                      <TableCell align="center">
                        {s.status === "active" ? (
                          <span className="text-green-500"> Active</span>
                        ) : s.status === "pending" ? (
                          <span className="text-yellow-500"> Pending</span>
                        ) : (
                          <span className="text-red-600"> {s.status}</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
