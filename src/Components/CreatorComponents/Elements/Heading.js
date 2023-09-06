import React from "react";
import { useState, useEffect } from "react";
import "./Elements.css";

const Heading = (props) => {
  const [name, setName] = useState(props.name);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    props.addFormName(name);
  });

  return (
    <div>
      <input
        className="element-input element-heading "
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Heading"
        size={37}
      />
    </div>
  );
};

export default Heading;
