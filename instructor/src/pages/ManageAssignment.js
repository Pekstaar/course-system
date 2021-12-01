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
import { toastError, toastSuccess } from "../components/toaster";
import ScaleLoader from "react-spinners/ScaleLoader";
import { AiFillDelete } from "react-icons/ai";

const ManageAssignment = () => {
  const { initState } = useContext(Context);
  const navigate = useNavigate();

  const [assignments, setAssignments] = React.useState([]);
  const [loading, setLoading] = React.useState([]);

  // fetch units on mount
  React.useEffect(() => {
    setLoading(true);
    const fetchCourses = () => {
      axios
        .get(`http://localhost:8081/api/assignment/all/${initState.auth._id}`)
        .then((r) => {
          r.data && setAssignments(r.data);
          //   console.log(r.data);
          setLoading(false);
        })
        .catch((err) => {
          err.response && toastError(err.response.data);
          setLoading(false);
        });
    };
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteUnit = (id) => {
    if (
      window.confirm(
        `Are you sure you want delete assignment? ${
          assignments.filter((x) => x._id === id)[0].code
        }`
      )
    ) {
      // filter unit out of units array.
      setAssignments(assignments.filter((u) => u._id !== id));

      axios
        .delete(`http://localhost:8081/api/assignment/${id}`)
        .then(() => toastSuccess("Assignment Deleted successfully!"))
        .catch((err) => err.response && toastError(err.response.data));
    }
  };

  // check if one is authenticated
  React.useEffect(() => {
    !initState.auth && navigate("/login");
  }, [initState.auth, navigate]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className=" h-full mt-14 py-2" style={{ marginLeft: "300px" }}>
        <BreadCrumb location="Instructor/assignments" />

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
          <div class="card mx-3">
            <div class="card-body">
              <h5 class="card-title">Assignments</h5>
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
                      <TableCell align="center" className="uppercase">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="bg-gray-50">
                    {assignments.map((u) => (
                      <TableRow key={u._id}>
                        <TableCell align="center" component="th" scope="row">
                          {u.topic}
                        </TableCell>
                        <TableCell align="center">{u.type}</TableCell>
                        <TableCell align="center">{u.unit.code}</TableCell>
                        <TableCell align="center">{u.deadline}</TableCell>
                        <TableCell align="center ">
                          <button
                            className="bg-white py-1 px-2 rounded shadow-xl ml-8"
                            onClick={() => deleteUnit(u._id)}
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
        )}
      </div>
    </>
  );
};

export default ManageAssignment;
