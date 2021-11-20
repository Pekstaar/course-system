import React from "react";
import DashboardPage from "./Pages/DashboardPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Students from "./Pages/StudentRegister";
import StudentManagement from "./Pages/StudentManagement";
import InstructorManagement from "./Pages/InstructorManagement";
import InstructorRegister from "./Pages/InstructorRegister";
import ManageFaculty from "./Pages/ManageFaculty";
import CreateFaculty from "./Pages/CreateFaculty";
import CreateSchool from "./Pages/CreateSchool";
import ManageSchool from "./Pages/ManageSchool";
import ManageCourse from "./Pages/ManageCourse";
import CreateCourse from "./Pages/CreateCourse";
import CreateUnit from "./Pages/CreateUnit";
import ManageUnit from "./Pages/ManageUnit";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import LandingPage from "./Pages/LandingPage";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" exact element={<LandingPage />} />
          {/* Dashboard Route */}
          <Route path="/dashboard" exact element={<DashboardPage />} />

          {/* Students route */}
          <Route path="admin/students/register" exact element={<Students />} />
          <Route path="admin/students/" exact element={<StudentManagement />} />

          {/* Instructors management */}
          <Route
            path="admin/instructors/"
            exact
            element={<InstructorManagement />}
          />
          <Route
            path="admin/instructors/register/"
            exact
            element={<InstructorRegister />}
          />

          {/* Faculties management */}
          <Route path="admin/faculties" exact element={<ManageFaculty />} />
          <Route
            path="admin/faculties/create"
            exact
            element={<CreateFaculty />}
          />

          {/* Schools route */}
          <Route path="admin/schools" exact element={<ManageSchool />} />
          <Route path="admin/schools/create" exact element={<CreateSchool />} />

          {/* Courses route */}
          <Route path="admin/courses" exact element={<ManageCourse />} />
          <Route path="admin/courses/create" exact element={<CreateCourse />} />

          {/* Units route */}
          <Route path="admin/units" exact element={<ManageUnit />} />
          <Route path="admin/units/create" exact element={<CreateUnit />} />

          {/* login pages */}
          <Route path="login" exact element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
