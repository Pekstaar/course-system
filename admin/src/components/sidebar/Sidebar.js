import React from "react";
import { SiCoursera } from "react-icons/si";
import { FaSchool } from "react-icons/fa";
import { RiBuilding2Fill } from "react-icons/ri";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      {/* <!-- ======= Sidebar ======= --> */}
      <aside id="sidebar" class="sidebar bg-indigo-100">
        <ul class="sidebar-nav" id="sidebar-nav">
          <li class="nav-item">
            <Link as="a" class="nav-link " to="/dashboard">
              <i class="bi bi-grid"></i>
              <span className="text-base tracking-wide font-medium">
                Dashboard
              </span>
            </Link>
          </li>
          {/* <!-- End Dashboard Nav --> */}
          {/* students */}
          <ListItem
            icon={<BsFillPeopleFill className="text-indigo-300 text-base" />}
            name={"Students"}
            id="students"
          >
            {/* register link */}
            <li className="hover:bg-indigo-50">
              <Link to="/admin/students/register" as="a">
                <i class="bi bi-circle"></i>
                <span>Register</span>
              </Link>
            </li>

            {/* management link */}
            <li className="hover:bg-indigo-50">
              <Link to="/admin/students" as="a">
                <i class="bi bi-circle"></i>
                <span>Manage</span>
              </Link>
            </li>
          </ListItem>
          {/* End of students */}

          {/* Instructors */}
          <ListItem
            icon={<BsFillPersonFill className="text-indigo-300 text-base" />}
            name={"Instructor"}
            id="instructors"
          >
            {/* management link */}
            <li className="hover:bg-indigo-50">
              <Link to="/admin/instructors" as="a">
                <i class="bi bi-circle"></i>
                <span>Manage</span>
              </Link>
            </li>

            {/* register link */}
            <li className="hover:bg-indigo-50">
              <Link to="/admin/instructors/register" as="a">
                <i class="bi bi-circle"></i>
                <span>Register</span>
              </Link>
            </li>
          </ListItem>
          {/* End of Instructors */}

          {/* Faculty */}
          <ListItem
            icon={<RiBuilding2Fill className="text-indigo-300 text-base" />}
            name={"Faculty"}
            id="faculty"
          >
            {/* Create link */}
            <li className="hover:bg-indigo-50">
              <Link to="/admin/faculties/create" as="a">
                <i class="bi bi-circle"></i>
                <span>Create</span>
              </Link>
            </li>

            {/* management link */}
            <li className="hover:bg-indigo-50">
              <Link to="/admin/faculties" as="a">
                <i class="bi bi-circle"></i>
                <span>Manage</span>
              </Link>
            </li>
          </ListItem>
          {/* <!-- End Icons Nav --> */}

          {/* End of Faculty */}

          {/* Schools */}
          <ListItem
            icon={<FaSchool className="text-indigo-300 text-base" />}
            name={"Schools"}
            id="schools"
          >
            {/* Create school */}
            <li className="hover:bg-indigo-50">
              <Link to="/admin/schools/create" as="a">
                <i class="bi bi-circle"></i>
                <span>Create</span>
              </Link>
            </li>

            {/* Manage schools */}
            <li className="hover:bg-indigo-50">
              <Link to="/admin/schools" as="a">
                <i class="bi bi-circle"></i>
                <span>Manage</span>
              </Link>
            </li>
          </ListItem>
          {/* end of Schools */}

          {/* /Courses */}
          <ListItem
            icon={<SiCoursera className="text-indigo-300 text-base" />}
            name={"Courses"}
            id="courses"
          >
            <li className="hover:bg-indigo-50">
              <Link to="/admin/courses/create" as="a">
                <i class="bi bi-circle"></i>
                <span>Create</span>
              </Link>
            </li>

            {/* Manage schools */}
            <li className="hover:bg-indigo-50">
              <Link to="/admin/courses" as="a">
                <i class="bi bi-circle"></i>
                <span>Manage</span>
              </Link>
            </li>
          </ListItem>
          {/* <!-- End courses Nav --> */}

          {/* /Units */}
          <ListItem
            icon={<span classname="text-blue-300">U</span>}
            name={"Units"}
            id="units"
          >
            <li className="hover:bg-indigo-50">
              <Link to="/admin/units/create" as="a">
                <i class="bi bi-circle"></i>
                <span>Create</span>
              </Link>
            </li>

            {/* Manage Units */}
            <li className="hover:bg-indigo-50">
              <Link to="/admin/units" as="a">
                <i class="bi bi-circle"></i>
                <span>Manage</span>
              </Link>
            </li>
          </ListItem>
          {/* <!-- End Units Nav --> */}
        </ul>
      </aside>
      {/* <!-- End Sidebar--> */}
    </div>
  );
};

export default Sidebar;

export const ListItem = ({ children, icon, name, id }) => {
  return (
    <li class="nav-item ">
      <a
        class="nav-link collapsed flex gap-2 w-full"
        data-bs-target={`#${id}`}
        data-bs-toggle="collapse"
        href="/"
      >
        {icon}
        <span className="text-base tracking-wide capitalize font-medium ml-2">
          {name}
        </span>
        <i class="bi bi-chevron-down ms-auto"></i>
      </a>
      <ul
        id={id}
        class="nav-content collapse bg-white mx-1 "
        data-bs-parent="#sidebar-nav"
      >
        {children}
      </ul>
    </li>
  );
};
