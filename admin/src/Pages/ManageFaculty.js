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
import axios from "axios";
import { toastError, toastSuccess } from "../components/toaster";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router";
import { Context } from "../context/Context";
import ScaleLoader from "react-spinners/ScaleLoader";

const ManageFaculty = () => {
  const { initState } = useContext(Context);
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const deleteFaculty = (id) => {
    if (window.confirm("Are you sure you want to delete faculty?")) {
      // filter item out of array
      const newArray = rows.filter((r) => r._id !== id);
      setRows(newArray);

      // delete request
      axios
        .delete(`http://localhost:8081/api/faculty/${id}`)
        .then(() => toastSuccess("Faculty Deleted Successfully!"))
        .catch((e) => toastError(e.response.data));
    }
  };

  // check if one is authenticated
  React.useEffect(() => {
    !initState.auth && navigate("/login");
  }, [initState.auth, navigate]);

  React.useEffect(() => {
    setLoading(true);
    const getFaculties = () => {
      axios
        .get("http://localhost:8081/api/faculty/all")
        .then((res) => {
          setRows(res.data);
          setLoading(false);
        })
        .catch((err) => {
          toastError(err.response.data);
          setLoading(false);
        });
    };

    getFaculties();
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className=" h-full mt-14 py-2" style={{ marginLeft: "300px" }}>
        <BreadCrumb location="Admin/Faculty" />
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
              <h5 class="card-title">Faculty Manager</h5>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="caption table">
                  <caption className="ml-20">Manage Faculties</caption>
                  <TableHead>
                    <TableRow className="bg-indigo-200">
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center" className="uppercase">
                        Faculty Of
                      </TableCell>
                      <TableCell align="center" className="uppercase">
                        Schools
                      </TableCell>
                      <TableCell align="center" className="uppercase">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="bg-gray-100">
                    {rows.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell align="center" component="th" scope="row">
                          {row.code}
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">
                          {row.schools.length}
                        </TableCell>
                        <TableCell align="center ">
                          <button
                            className="bg-white py-1 px-2 rounded shadow-xl ml-8"
                            onClick={() => deleteFaculty(row._id)}
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

export default ManageFaculty;
