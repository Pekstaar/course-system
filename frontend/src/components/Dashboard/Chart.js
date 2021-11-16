import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// const students = 3000;
const data = [
  {
    name: "CIT",
    students: 200,
    pv: 2400,
  },
  {
    name: "ISS",
    students: 180,
  },
  {
    name: "CAD",
    students: 120,
  },
  {
    name: "LCS",
    students: 100,
  },
  {
    name: "BMS",
    students: 110,
  },
  //   {
  //     name: "CIT",
  //     schools: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "ISS",
  //     schools: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "CAD",
  //     schools: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "BMS",
  //     schools: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "HHE",
  //     schools: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "LCS",
  //     schools: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "BLS",
  //     schools: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
];

export default class Chart extends PureComponent {
  render() {
    return (
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 20,
          bottom: 5,
        }}
        barSize={30}
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="students" fill="blue" background={{ fill: "#ddd" }} />
      </BarChart>
    );
  }
}
