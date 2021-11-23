import axios from "axios";
import React, { useContext } from "react";
import BreadCrumb from "../components/navbar/BreadCrumb";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { Context } from "../context/Context";
import PrivateRouter from "../PrivateRouter";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Dashboard = () => {
  const { initState } = useContext(Context);
  const [students, setStudents] = React.useState([]);

  React.useEffect(() => {
    initState.auth &&
      axios
        .get(
          `${process.env.REACT_APP_VAR_API}students?course=${initState.auth.course._id}`
        )
        .then((r) => setStudents(r.data))
        .catch((err) => console.log(err.message));
  }, [initState.auth]);

  return (
    <PrivateRouter>
      <Navbar />
      <Sidebar />
      <div className=" h-full py-2" style={{ marginLeft: "300px" }}>
        <div className="mt-16">
          <BreadCrumb location="Student/Dashboard" />
        </div>
        <div className="w-full px-4 ">
          {/* fields: firstname, lastname, email, dob, phoneno,location address,school,course,level */}
          {/* registration form */}
          <div className="card">
            <div className="flex justify-between">
              <h5 className="card-title mx-4 text-xl">
                COURSE: {initState.auth && initState.auth.course.name}
              </h5>
            </div>
            <h2 className="mx-4 text-xl">Course Members</h2>

            <div className="card-body">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <caption>
                    {initState.auth && initState.auth.course.name} classList
                  </caption>
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
                          <TableCell align="center">
                            {s.user.username}
                          </TableCell>
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
      </div>
    </PrivateRouter>
  );
};

export default Dashboard;
