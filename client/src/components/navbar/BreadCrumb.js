import React from "react";

const BreadCrumb = ({ location }) => {
  const names = location.split("/");
  const last = names.length - 1;

  const handleLocations = () => {
    for (let i = 1; i < last; i++) {
      return (
        <li className="breadcrumb-item">
          <a href="/">{names[i]}</a>
        </li>
      );
    }
  };

  return (
    <div className="pagetitle px-4 py-1">
      <h1>{names[last]}</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">{names[0]}</a>
          </li>

          {handleLocations()}

          <li className="breadcrumb-item active">{names[last]}</li>
        </ol>
      </nav>
    </div>
  );
};

export default BreadCrumb;
