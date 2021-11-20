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
import { AiFillDelete } from "react-icons/ai";
import ScaleLoader from "react-spinners/ScaleLoader";

const ManageUnit = () => {
  const { initState } = useContext(Context);
  const navigate = useNavigate();

  const [units, setUnits] = React.useState([]);
  const [loading, setLoading] = React.useState([]);

  // funtion to delete Unit
  const deleteUnit = (id) => {
    if (
      window.confirm(
        `Are you sure you want delete unit? ${
          units.filter((x) => x._id === id)[0].code
        }`
      )
    ) {
      // filter unit out of units array.
      setUnits(units.filter((u) => u._id !== id));

      axios
        .delete(`http://localhost:8081/api/unit/${id}`)
        .then(() => toastSuccess("unitDeleted successfully!"))
        .catch((err) => err.response && toastError(err.response.data));
    }
  };

  // fetch courses on mount
  React.useEffect(() => {
    setLoading(true);
    const fetchCourses = () => {
      axios
        .get("http://localhost:8081/api/unit/all")
        .then((r) => {
          r.data && setUnits(r.data);
          setLoading(false);
        })
        .catch((err) => {
          err.response && toastError(err.response.data);
          setLoading(false);
        });
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
        <BreadCrumb location="Admin/Units" />

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
              <h5 class="card-title">Units Manager</h5>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <caption className="ml-20">Manage Units</caption>
                  <TableHead>
                    <TableRow className="bg-indigo-100">
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Unit Name</TableCell>
                      <TableCell align="center" className="uppercase">
                        Course
                      </TableCell>
                      <TableCell align="center" className="uppercase">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="bg-gray-50">
                    {units.map((u) => (
                      <TableRow key={u._id}>
                        <TableCell align="center" component="th" scope="row">
                          {u.code}
                        </TableCell>
                        <TableCell align="center">{u.name}</TableCell>
                        <TableCell align="center">{u.course.code}</TableCell>
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

export default ManageUnit;
