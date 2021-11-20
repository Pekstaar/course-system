import React from "react";

const Card = ({ text, number, icon }) => {
  return (
    <div className="w-64 col-lg-3">
      <div className="card info-card sales-card">
        {/* <div className="card-body"> */}
        <div className="flex align-items-center p-3 gap-4">
          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            {icon}
          </div>

          <div>
            <h5 className="card-title">{text}</h5>
            {/* <div className="ps-3"> */}
            <h5>{number}</h5>
            {/* </div> */}
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Card;
