import React from "react";
// import Butt?

const Button = ({ onClick, label, type }) => {
  return (
    <button type={type} onClick={onClick} className="text-blue-500">
      {label}
    </button>
  );
};

export default Button;
