import React from "react";
import { useState, useEffect } from "react";

const Address = (props) => {
  const [label, setLabel] = useState(props.label);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    const field = {
      id: props.id,
      type: "address",
      label: label,
    };
    props.addFormConfiguration(field);
  });

  return (
    <div className="element-name">
      <input
        className="element-input element-gap element-border-style"
        value={label}
        placeholder="Address"
        onChange={handleLabelChange}
      />
      <input
        className="element-input"
        placeholder="Enter your address"
        type="text"
      ></input>
    </div>
  );
};

export default Address;
