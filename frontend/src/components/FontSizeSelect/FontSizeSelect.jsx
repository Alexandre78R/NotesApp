import React from "react";

const FontSizeSelect = ({ values, current, onChange }) => {
  return (
    <select value={current} onChange={(e) => onChange(e.target.value)}>
      {values.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default FontSizeSelect;
