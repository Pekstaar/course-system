import React from "react";

const NewStudents = () => {
  return (
    // <!-- Recent Sales -->
    <div className="col-12">
      <div className="card recent-sales">
        <div className="card-body">
          <h5 className="card-title">Recent Students</h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">name</th>
                <th scope="col">school</th>
                <th scope="col">course</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <TableRow
                id="COMP00119"
                name="Eric Pekmah"
                school="Computing"
                course="Computer Networking"
                status="pending"
              />

              <TableRow
                id="COMP00219"
                name="Eunice Weru"
                school="Computing"
                course="Computer Science"
                status="pending"
              />

              <TableRow
                id="COMP00319"
                name="Millicent Milly"
                school="Computing"
                course="Information Technology"
                status="pending"
              />

              <TableRow
                id="BUSS00119"
                name="Kennedy Ndung'u"
                school="Business"
                course="BCOM"
                status="approved"
              />

              <TableRow
                id="BUSS00119"
                name="Mitchelle Waithera"
                school="CREATIVE ARTS AND MEDIA"
                course="Fine & Virtual Arts"
                status="approved"
              />

              <TableRow
                id="CAM00119"
                name="Fred Erickson"
                school="Creative Arts and Media"
                course="Journalism & Media Studies"
                status="discontinued"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
    // <!-- End Recent Sales -->
  );
};

export default NewStudents;

export const TableRow = ({ id, name, school, course, status }) => {
  return (
    <tr cla>
      <th scope="row">
        <a href="/">{id}</a>
      </th>
      <td>{name}</td>
      <td>
        <a href="/" className="text-primary">
          {school}
        </a>
      </td>
      <td>{course}</td>
      <td>
        <span
          className={
            status === "approved"
              ? "badge bg-green-500 p-2"
              : status === "pending"
              ? "badge bg-yellow-500 p-2"
              : "badge bg-red-600 p-2"
          }
        >
          {status}
        </span>
      </td>
    </tr>
  );
};
