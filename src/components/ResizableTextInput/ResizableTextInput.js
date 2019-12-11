import React, { useRef, useEffect } from "react";

import style from "./ResizableTextInput.module.css";

const ResizableTextInput = ({
  className,
  type = "text",
  value,
  placeholder = "Add content ...",
  lineHeight = 24,
  onChange,
  editing
}) => {
  const textInput = useRef();

  const handleChange = event => {
    if(event) {
      const previousRows = event.rows;
  
      event.rows = 1; // reset to the min-row
      const currentRows = Math.ceil(event.scrollHeight / lineHeight);
  
      currentRows === previousRows
        ? (event.rows = previousRows)
        : (event.rows = currentRows);
  
      onChange(event.value);
    }
  };

  // handle when editing note to resize note
  useEffect(() => {

    editing
      ? setTimeout(() => handleChange(textInput.current), 350)
      : handleChange(textInput.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <textarea
      className={`${style.resizableTextInput} ${className}`}
      value={value}
      type={type}
      placeholder={placeholder}
      ref={textInput}
      autoFocus
      onChange={e => handleChange(e.target)}
    />
  );
};

export default ResizableTextInput;
