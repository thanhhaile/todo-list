import React, { useState } from "react";

import style from './ResizableTextInput.module.css';


const ResizableTextInput = ({
  className = style.resizableTextInput,
  type = "text",
  value,
  placeholder = "Add content ...",
  lineHeight = 24,
  onChange
}) => {

  // const [value, setValue] = useState("");

  const [rowNumber, setRowNumber] = useState(1);

  const handleChangeHeadline = event => {
    const previousRows = event.target.rows;
    event.target.rows = 1;
    const currentRows = Math.ceil(event.target.scrollHeight / lineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    setRowNumber(currentRows);
    onChange(event.target.value);
    // setValue(event.target.value);
  };

  return (
    <textarea
      className={className}
      value={value}
      type={type}
      rows={rowNumber}
      placeholder={placeholder}
      autoFocus
      onChange={e => handleChangeHeadline(e)}
    />
  );
};

export default ResizableTextInput;
