import React from "react";
import { useState, useEffect } from "react";

const Time = (props) => {
  const [label, setLabel] = useState(props.label);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    const field = {
      id: props.id,
      type: "time",
      label: label,
    };
    props.addFormConfiguration(field);
  });

  return (
    <div className="element-name">
      <input
        className="element-input element-gap element-border-style"
        value={label}
        placeholder="Time"
        onChange={handleLabelChange}
      />
      <input
        className="element-input min-width-input time-input"
        type="time"
        // onChange={handleLabelChange}
      />
    </div>
  );
};

export default Time;
