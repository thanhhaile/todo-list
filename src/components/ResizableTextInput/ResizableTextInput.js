import React, { useState, useRef, useEffect } from "react";

import style from "./ResizableTextInput.module.css";

const ResizableTextInput = ({
  className,
  type = "text",
  value,
  placeholder = "Add content ...",
  lineHeight = 24,
  onChange,
  isEditing
}) => {
  const textInput = useRef();

  // let focus = useRef(false);

  const [rowNumber, setRowNumber] = useState(1);

  const handleChange = event => {
    const previousRows = event.rows;
    event.rows = 1; // reset
    const currentRows = Math.ceil(event.scrollHeight / lineHeight);

    currentRows === previousRows
      ? (event.rows = previousRows)
      : setRowNumber(currentRows);

    onChange(event.value);
  };

  // handle when editing note to resize note
  useEffect(() => {
    handleChange(textInput.current);
    // console.log(textInput.current.scrollHeight);
  }, []);

  useEffect(() => {
    if (isEditing) {
      textInput.current.focus();
    }
  }, [isEditing]);

  return (
    <textarea
      className={`${style.resizableTextInput} ${className}`}
      value={value}
      type={type}
      rows={rowNumber}
      placeholder={placeholder}
      ref={textInput}
      autoFocus
      onChange={e => handleChange(e.target)}
    />
  );
};

export default ResizableTextInput;
