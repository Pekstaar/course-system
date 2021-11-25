import React from "react";
import { BsFileEarmarkRichtextFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      {/* <!-- ======= Sidebar ======= --> */}
      <aside id="sidebar" className="sidebar bg-indigo-100">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link as="a" className="nav-link " to="/dashboard">
              <i className="bi bi-grid"></i>
              <span className="text-base tracking-wide font-medium">
                Dashboard
              </span>
            </Link>
          </li>
          {/* <!-- End Dashboard Nav --> */}

          {/* /Assignments */}
          <ListItem
            icon={<BsFileEarmarkRichtextFill className="text-blue-300" />}
            name={"Assignment"}
            id="assignment"
          >
            <li className="hover:bg-indigo-50">
              <Link to="/assignments" as="a">
                <i className="bi bi-circle"></i>
                <span>View</span>
              </Link>
            </li>

            <li className="hover:bg-indigo-50">
              <Link to="/submits" as="a">
                <i className="bi bi-circle"></i>
                <span>Submits</span>
              </Link>
            </li>
          </ListItem>

          {/* /Profile */}
          <ListItem
            icon={<CgProfile className="text-blue-300" />}
            name={"Your Profile"}
            id="units"
          >
            <li className="hover:bg-indigo-50">
              <Link to="/profile" as="a">
                <i className="bi bi-circle"></i>
                <span>manage</span>
              </Link>
            </li>

            {/* Manage Units */}
            <li className="hover:bg-indigo-50">
              <Link to="/account" as="a">
                <i className="bi bi-circle"></i>
                <span>Account</span>
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
    <li className="nav-item ">
      <a
        className="nav-link collapsed flex gap-2 w-full"
        data-bs-target={`#${id}`}
        data-bs-toggle="collapse"
        href="/"
      >
        {icon}
        <span className="text-base tracking-wide capitalize font-medium ml-2">
          {name}
        </span>
        <i className="bi bi-chevron-down ms-auto"></i>
      </a>
      <ul
        id={id}
        className="nav-content collapse bg-white mx-1 "
        data-bs-parent="#sidebar-nav"
      >
        {children}
      </ul>
    </li>
  );
};
