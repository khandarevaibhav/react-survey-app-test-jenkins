import React from "react";
import { useState, useEffect } from "react";

const ShortAns = (props) => {
  const [label, setLabel] = useState(props.label);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    const field = {
      id: props.id,
      type: "shortAns",
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
      <input className="element-input" type="text"></input>
    </div>
  );
};

export default ShortAns;
