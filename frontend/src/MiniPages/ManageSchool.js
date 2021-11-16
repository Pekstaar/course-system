import React from "react";
import BreadCrumb from "../components/navbar/BreadCrumb";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ManageSchool = () => {
  return (
    <>
      <BreadCrumb location="Admin/Schools" />

      {/* body */}
      <div className="w-full px-4 ">
        {/* registration form */}
        <div class="card">
          <h5 class="card-title mx-4">Manage Schools</h5>
          <div class="card-body">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <caption className="ml-20">Manage Schools</caption>
                <TableHead>
                  <TableRow className="bg-indigo-100">
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center" className="uppercase">
                      School Of
                    </TableCell>

                    <TableCell align="center" className="uppercase">
                      Faculty
                    </TableCell>

                    <TableCell align="center" className="uppercase">
                      Courses offered
                    </TableCell>

                    <TableCell align="center" className="uppercase">
                      Total Students
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="bg-gray-50">
                  {/* {[{}].map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="center" component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSchool;
