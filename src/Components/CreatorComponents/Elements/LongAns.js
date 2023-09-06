import React from "react";
import { useState, useEffect } from "react";

const LongAns = (props) => {
  const [label, setLabel] = useState(props.label);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    const field = {
      id: props.id,
      type: "longAns",
      label: label,
    };
    props.addFormConfiguration(field);
  });

  return (
    <div className="element-name">
      <input
        className="element-input element-gap element-border-style"
        value={label}
        placeholder="Type your question here"
        onChange={handleLabelChange}
      />

      <textarea
        className="element-input"
        name="text"
        rows="10"
        cols="30"
      ></textarea>
    </div>
  );
};

export default LongAns;
