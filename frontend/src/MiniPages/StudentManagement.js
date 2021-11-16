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

const rows = [
  {
    id: "scit00219",
    fullname: "Ben Pekmah",
    email: "ericpekmah@email.com",
    school: "BIT",
    course: "Information technology",
    level: "Diploma",
    status: "active",
  },
  {
    id: "scit00119",
    fullname: "Eric Pekmah",
    email: "ericpekmah@email.com",
    school: "CIT",
    course: "Networking ",
    level: "Diploma",
    status: "active",
  },
  {
    id: "scit00119",
    fullname: "Eric Pekmah",
    email: "ericpekmah@email.com",
    school: "CIT",
    course: "Networking",
    level: "Diploma",
    status: "active",
  },
  {
    id: "scit00119",
    fullname: "Eric Pekmah",
    email: "ericpekmah@email.com",
    school: "CIT",
    course: "Networking",
    level: "Diploma",
    status: "active",
  },
  {
    id: "scit00119",
    fullname: "Eric Pekmah",
    email: "ericpekmah@email.com",
    school: "CIT",
    course: "Networking",
    level: "Diploma",
    status: "suspended",
  },
  {
    id: "scit00119",
    fullname: "Eric Pekmah",
    email: "ericpekmah@email.com",
    school: "CIT",
    course: "Networking",
    level: "Diploma",
    status: "pending",
  },
];

export default function StudentManagement() {
  return (
    <>
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
                  <TableCell align="right">Fullname</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">School</TableCell>
                  <TableCell align="right">Course</TableCell>
                  <TableCell align="right">Level</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="bg-gray-50">
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.fullname}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.school}</TableCell>
                    <TableCell align="right">{row.course}</TableCell>
                    <TableCell align="right">{row.level}</TableCell>
                    <TableCell align="right">
                      {row.status === "active" ? (
                        <span className="text-green-500"> Active</span>
                      ) : row.status === "pending" ? (
                        <span className="text-yellow-500"> Pending</span>
                      ) : (
                        <span className="text-green-500"> Active</span>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {row.status === "pending" ? (
                        <Button variant="outlined" color="warning" size="small">
                          {" "}
                          Approve
                        </Button>
                      ) : row.status === "suspended" ? (
                        <Button variant="outlined" color="success" size="small">
                          Activate
                        </Button>
                      ) : (
                        <Button variant="outlined" color="error" size="small">
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
    </>
  );
}
