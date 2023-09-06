import React from "react";
import { useState, useEffect } from "react";

const Email = (props) => {
  const [label, setLabel] = useState(props.label);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    const field = {
      id: props.id,
      type: "email",
      label: label,
    };
    props.addFormConfiguration(field);
  });

  return (
    <div className="element-name">
      <input
        className="element-input element-gap element-border-style"
        value={label}
        placeholder="Email"
        onChange={handleLabelChange}
      />
      <input
        className="element-input element-border-style"
        placeholder="example@example.com"
        type="email"
        // onChange={handleLabelChange}
        size={40}
      />
    </div>
  );
};

export default Email;
