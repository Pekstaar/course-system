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
import axios from "axios";
import BreadCrumb from "../components/navbar/BreadCrumb";
import { useNavigate } from "react-router";
import { Context } from "../context/Context";
import PrivateRouter from "../PrivateRouter";

const Assignments = () => {
  const { initState } = useContext(Context);
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  // load School on mount
  //   React.useEffect(() => {
  //     setAssignments(initState.auth);
  //   }, [initState]);

  //   React.useEffect(() => {
  //     console.log(assignments);
  //   }, [assignments]);

  // check if one is authenticated
  React.useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_VAR_API}assignment?course=${
          initState.auth && initState.auth.course._id
        }`
      )
      .then((r) => setAssignments(r.data))
      .catch((err) => console.log(err.message));
  }, [initState.auth]);
  //   const [selectedSchool, setSelectedSchool] = useState({});

  return (
    <PrivateRouter>
      <Navbar />
      <Sidebar />
      <div classNameName=" h-full py-2" style={{ marginLeft: "300px" }}>
        <div className="mt-16">
          <BreadCrumb location="Student/View assignments" />
        </div>
        <div classNameName="w-full px-4 ">
          {/* fields: firstname, lastname, email, dob, phoneno,location address,school,course,level */}
          {/* registration form */}
          <div className="card">
            <div className="flex justify-between">
              <h5 className="card-title mx-4 uppercase text-xl">
                View Your Assignments
              </h5>
              <h5 className="card-title mx-4 lowercase ">
                {initState.auth && initState.auth.course.name}
              </h5>
            </div>
            <div className="card-body">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <caption className="ml-20">Your Assignments</caption>
                  <TableHead>
                    <TableRow className="bg-indigo-100">
                      <TableCell align="center">Topic</TableCell>
                      <TableCell align="center">Type</TableCell>
                      <TableCell align="center" className="uppercase">
                        Unit
                      </TableCell>
                      <TableCell align="center" className="uppercase">
                        Deadline
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="bg-gray-50">
                    {assignments &&
                      assignments.map((u) => (
                        // <Link to="/dashboard">
                        <TableRow
                          key={u._id}
                          onClick={() => navigate(`/assignment/${u._id}`)}
                          className="hover:bg-indigo-200 cursor-pointer"
                        >
                          <TableCell align="center" component="th" scope="row">
                            {u.topic}
                          </TableCell>
                          <TableCell align="center">{u.type}</TableCell>
                          <TableCell align="center">{u.unit.name}</TableCell>
                          <TableCell align="center">{u.deadline}</TableCell>
                        </TableRow>
                        // </Link>
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

export default Assignments;
