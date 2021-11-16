import React from "react";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { FaSchool } from "react-icons/fa";
import { RiBuilding2Fill } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import Card from "../components/Dashboard/Card";
import Chart from "../components/Dashboard/Chart";
import NewStudents from "../components/Dashboard/NewStudents";
import RecentActivity from "../components/Dashboard/RecentActivity";
import BreadCrumb from "../components/navbar/BreadCrumb";

const DashboardBody = () => {
  return (
    <>
      <BreadCrumb location="Home/Students/Dashboard" />

      <div className="p-1 flex flex-col">
        {/* <cards-start> */}
        <div className="cards row self-center">
          <Card
            number={200}
            icon={<BsFillPeopleFill className="text-indigo-300 text-3xl" />}
            text={"Students"}
          />
          <Card
            number={20}
            icon={<BsFillPersonFill className="text-indigo-300 text-3xl" />}
            text={"Instuctors"}
          />
          <Card
            number={3}
            icon={<RiBuilding2Fill className="text-indigo-300 text-3xl" />}
            text={"Faculties"}
          />
          <Card
            number={20}
            icon={<SiCoursera className="text-indigo-300 text-3xl" />}
            text={"Courses"}
          />
          <Card
            number={6}
            icon={<FaSchool className="text-indigo-300 text-3xl" />}
            text={"Schools"}
          />
        </div>
        {/* <cards-end /> */}
        {/* <recentstudents-start> */}
        <div className="md:flex content-between w-full">
          <div className="recentStudents self-start ml-4 w-4/6 mr-6">
            <NewStudents />

            {/* <chart-start > */}
            <div className="bg-white p-4 w-full flex flex-col items-center ">
              <h5 class="card-title">Students per School </h5>
              <Chart />
            </div>
            {/* </chart-end > */}
          </div>

          <div className="bg-white w-2/6 ml-6 flex flex-col items-center rounded-xl  ">
            <h5 class="card-title" style={{ textDecoration: "underline" }}>
              Recent Activities
            </h5>
            <RecentActivity />
          </div>
        </div>
        {/* </recentstudents-end> */}
        {/* <footer-start> */}
        {/* </footer-end> */}
      </div>
    </>
  );
};

export default DashboardBody;
