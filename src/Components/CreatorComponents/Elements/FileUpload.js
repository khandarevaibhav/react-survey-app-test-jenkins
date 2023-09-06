import React from "react";
import { useState, useEffect } from "react";

const FileUpload = (props) => {
  const [label, setLabel] = useState(props.label);

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  useEffect(() => {
    const field = {
      id: props.id,
      type: "file",
      label: label,
    };
    props.addFormConfiguration(field);
  });

  return (
    <div className="element-name">
      <input
        className="element-input element-gap element-border-style"
        value={label}
        placeholder="File"
        onChange={handleLabelChange}
      />
      <input className="element-input min-width-input" type="file"></input>
    </div>
  );
};

export default FileUpload;
