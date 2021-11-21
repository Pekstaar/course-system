import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import BreadCrumb from "../components/navbar/BreadCrumb";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";
import { Context } from "../context/Context";
import { useNavigate } from "react-router";
import { toastError, toastSuccess } from "../components/toaster";

export default function StudentManagement() {
  const { initState } = React.useContext(Context);
  const navigate = useNavigate();

  const [students, setStudents] = React.useState([]);
  const [performFetch, setPerformFetch] = React.useState(true);

  const fetchStudents = () => {
    axios
      .get(`${process.env.REACT_APP_VAR_API}students`)
      .then((r) => {
        setStudents(r.data);
        // console.log(r.data);
      })
      .catch((err) => toastError(err.message));
  };
  // fetch students on mount
  React.useEffect(() => {
    fetchStudents();
  }, [performFetch]);

  // check if one is authenticated
  React.useEffect(() => {
    !initState.auth && navigate("/login");
  }, [initState.auth, navigate]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className=" h-full mt-14 py-2" style={{ marginLeft: "300px" }}>
        <BreadCrumb location="Admin/Students" />

        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Students Manager</h5>
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
                    <TableCell align="center">Actions</TableCell>
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
                        <TableCell align="center">
                          {s.status === "pending" ? (
                            <Button
                              variant="outlined"
                              color="warning"
                              size="small"
                              onClick={() => {
                                axios
                                  .put(
                                    `${process.env.REACT_APP_VAR_API}students/${s._id}`,
                                    {
                                      status: "active",
                                      sender: "admin",
                                    }
                                  )
                                  .then(() =>
                                    toastSuccess(
                                      `${s.user.username} approved Successfully!`
                                    )
                                  )
                                  .catch((err) => toastError(err.message));

                                setPerformFetch(!performFetch);
                              }}
                            >
                              Approve
                            </Button>
                          ) : s.status === "suspended" ? (
                            <Button
                              variant="outlined"
                              color="success"
                              size="small"
                              onClick={() => {
                                axios
                                  .put(
                                    `${process.env.REACT_APP_VAR_API}students/${s._id}`,
                                    {
                                      status: "active",
                                      sender: "admin",
                                    }
                                  )
                                  .then(() =>
                                    toastSuccess(
                                      `${s.user.username} activated Successfully!`
                                    )
                                  )
                                  .catch((err) => toastError(err.message));

                                setPerformFetch(!performFetch);
                              }}
                            >
                              Activate
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => {
                                axios
                                  .put(
                                    `${process.env.REACT_APP_VAR_API}students/${s._id}`,
                                    {
                                      status: "suspended",
                                      sender: "admin",
                                    }
                                  )
                                  .then(() =>
                                    toastSuccess(
                                      `${s.user.username} suspended Successfully!`
                                    )
                                  )
                                  .catch((err) => toastError(err.message));

                                setPerformFetch(!performFetch);
                              }}
                            >
                              Suspend
                            </Button>
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
    </>
  );
}
