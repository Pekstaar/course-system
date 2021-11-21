import React from "react";
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
import { useNavigate } from "react-router";
import { Context } from "../context/Context";
import { toastError, toastSuccess, toastWarning } from "../components/toaster";

const InstructorManagement = () => {
  const { initState } = React.useContext(Context);
  const navigate = useNavigate();

  const [instructors, setInstructors] = React.useState([]);
  const [performFetch, setPerformFetch] = React.useState(true);

  const fetchStudents = () => {
    axios
      .get(`${process.env.REACT_APP_VAR_API}instructor`)
      .then((r) => {
        setInstructors(r.data);
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
        <BreadCrumb location="Admin/Instructors" />
        <div class="card mx-3">
          <div class="card-body">
            <h5 class="card-title">Instructors Manager</h5>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption>Manage Tutors</caption>
                <TableHead>
                  <TableRow className="bg-indigo-100">
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Fullname</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Subject</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="bg-gray-50">
                  {instructors &&
                    instructors.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell component="th" scope="row">
                          {row.code}
                        </TableCell>
                        <TableCell align="right">{row.user.username}</TableCell>
                        <TableCell align="right">{row.user.email}</TableCell>
                        <TableCell align="right">{row.subject}</TableCell>
                        <TableCell align="right">
                          {row.status === "active" ? (
                            <span className="text-green-500"> Active</span>
                          ) : row.status === "pending" ? (
                            <span className="text-yellow-500"> Pending</span>
                          ) : (
                            <span className="text-red-500"> suspended</span>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {row.status === "pending" ? (
                            <Button
                              variant="outlined"
                              color="warning"
                              size="small"
                              onClick={() => {
                                axios
                                  .put(
                                    `${process.env.REACT_APP_VAR_API}instructor/${row._id}`,
                                    {
                                      status: "active",
                                      sender: "admin",
                                    }
                                  )
                                  .then(() =>
                                    toastSuccess(
                                      `${row.user.username} approved Successfully!`
                                    )
                                  )
                                  .catch((err) => toastError(err.message));

                                setPerformFetch(!performFetch);
                              }}
                            >
                              Approve
                            </Button>
                          ) : row.status === "suspended" ? (
                            <Button
                              variant="outlined"
                              color="success"
                              size="small"
                              onClick={() => {
                                axios
                                  .put(
                                    `${process.env.REACT_APP_VAR_API}instructor/${row._id}`,
                                    {
                                      status: "active",
                                      sender: "admin",
                                    }
                                  )
                                  .then(() =>
                                    toastSuccess(
                                      `${row.user.username} activated Successfully!`
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
                                    `${process.env.REACT_APP_VAR_API}instructor/${row._id}`,
                                    {
                                      status: "suspended",
                                      sender: "admin",
                                    }
                                  )
                                  .then(() =>
                                    toastWarning(
                                      `${row.user.username} suspended!`
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
};

export default InstructorManagement;
