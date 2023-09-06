import React from "react";
import { useState, useEffect } from "react";

const Phone = (props) => {
  const [label, setLabel] = useState(props.label);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    const field = {
      id: props.id,
      type: "tel",
      label: label,
    };
    props.addFormConfiguration(field);
  });

  return (
    <div className="element-name">
      <input
        className="element-input element-gap element-border-style"
        value={label}
        placeholder="Phone Number"
        onChange={handleLabelChange}
      />
      <input
        type={"number"}
        className="element-input min-width-input element-border-style"
        placeholder="9999999999"
        // onChange={handleLabelChange}
      />
    </div>
  );
};

export default Phone;
