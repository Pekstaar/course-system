import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BreadCrumb from "../components/navbar/BreadCrumb";

const ManageCourse = () => {
  const rows = [
    {
      id: "EBE",
      name: "Engineering and the Built Environment",
    },
  ];

  return (
    <>
      <BreadCrumb location="Admin/Courses" />
      <div class="card">
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
                  <TableCell align="center" className="uppercase">
                    Level
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="bg-gray-50">
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell align="center" component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ManageCourse;
