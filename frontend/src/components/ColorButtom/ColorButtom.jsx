import React from "react";

const ColorButton = ({ color, onClick }) => {
  const handleColorClick = () => {
    onClick(color);
  };

  return (
    <button
      className="ql-color"
      style={{ backgroundColor: color }}
      onClick={handleColorClick}
    />
  );
};

export default ColorButton;
