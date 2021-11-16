import React from "react";
import DashboardPage from "./MiniPages/DashboardPage";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Students from "./MiniPages/StudentRegister";
import StudentManagement from "./MiniPages/StudentManagement";
import InstructorManagement from "./MiniPages/InstructorManagement";
import InstructorRegister from "./MiniPages/InstructorRegister";
import ManageFaculty from "./MiniPages/ManageFaculty";
import CreateFaculty from "./MiniPages/CreateFaculty";
import CreateSchool from "./MiniPages/CreateSchool";
import ManageSchool from "./MiniPages/ManageSchool";
import ManageCourse from "./MiniPages/ManageCourse";
import CreateCourse from "./MiniPages/CreateCourse";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <div className=" h-full mt-14 py-2" style={{ marginLeft: "300px" }}>
        <Routes>
          {/* Dashboard Route */}
          <Route path="/" exact element={<DashboardPage />} />

          {/* Students route */}
          <Route path="/students/register" exact element={<Students />} />
          <Route path="/students/" exact element={<StudentManagement />} />

          {/* Instructors management */}
          <Route
            path="/instructors/"
            exact
            element={<InstructorManagement />}
          />
          <Route
            path="/instructors/register/"
            exact
            element={<InstructorRegister />}
          />

          {/* Faculties management */}
          <Route path="/faculties" exact element={<ManageFaculty />} />
          <Route path="/faculties/create" exact element={<CreateFaculty />} />

          {/* Schools route */}
          <Route path="/schools" exact element={<ManageSchool />} />
          <Route path="/schools/create" exact element={<CreateSchool />} />

          {/* Courses route */}
          <Route path="/courses" exact element={<ManageCourse />} />
          <Route path="/courses/create" exact element={<CreateCourse />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
