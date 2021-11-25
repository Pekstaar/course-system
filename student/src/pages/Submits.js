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
import { Context } from "../context/Context";
import PrivateRouter from "../PrivateRouter";

const Submits = () => {
  const { initState } = useContext(Context);

  const [assignments, setAssignments] = useState([]);

  // load School on mount
  //   React.useEffect(() => {
  //     setAssignments(initState.auth);
  //   }, [initState]);

  //   React.useEffect(() => {
  //     console.log("Assignments", assignments);
  //   }, [assignments]);

  // check if one is authenticated
  React.useEffect(() => {
    initState.auth &&
      axios
        .get(
          `${process.env.REACT_APP_VAR_API}submit/${
            initState.auth && initState.auth._id
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
          <BreadCrumb location="Student/assignments/submits" />
        </div>
        <div classNameName="w-full px-4 ">
          {/* fields: firstname, lastname, email, dob, phoneno,location address,school,course,level */}
          {/* registration form */}
          <div className="card">
            <div className="flex justify-between">
              <h5 className="card-title mx-4 uppercase text-xl">
                Submitted Assignments
              </h5>
              <h5 className="card-title mx-4 lowercase ">
                {/* {initState.auth && initState.auth.course.name} */}
              </h5>
            </div>
            <div className="card-body">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <caption className="ml-20">Submitted Assignments</caption>
                  <TableHead>
                    <TableRow className="bg-indigo-100">
                      <TableCell align="center">Topic</TableCell>
                      <TableCell align="center">Status</TableCell>

                      <TableCell align="center" className="uppercase">
                        Grade
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="bg-gray-50">
                    {assignments &&
                      assignments.map((u) => (
                        // <Link to="/dashboard">
                        <TableRow key={u._id}>
                          <TableCell align="center" component="th" scope="row">
                            {u.assignment.topic}
                          </TableCell>
                          <TableCell align="center">
                            <span
                              className={
                                u.verified
                                  ? "text-green-500 font-bold tracking-wider uppercase"
                                  : "text-yellow-500 font-bold tracking-wider uppercase"
                              }
                            >
                              {u.verified ? "verified" : "Pending"}
                            </span>
                          </TableCell>
                          <TableCell align="center">
                            <span className="font-bold tracking-wider text-gray-600">
                              {u.grade}%
                            </span>
                          </TableCell>
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

export default Submits;
