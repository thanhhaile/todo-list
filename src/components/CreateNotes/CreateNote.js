import React, { useState, useEffect, useContext } from "react";
import _ from 'lodash';

import ResizableTextInput from "../ResizableTextInput/ResizableTextInput";
import { AppContext } from "../../context/AppContext";

import style from "./CreateNote.module.css";

const CreateNote = () => {

  const { noteList, addNote } = useContext(AppContext);

  const [focus, setFocus] = useState(false);

  const [item, setItem] = useState({
    headline: "",
    paragraph: "",
    ghim: false,
    id: '',
  });

  const updateHeadline = (content) => {
    setItem({
      ...item,
      headline: content,
      id: _.uniqueId(`${content}-`)
    })
  };

  const updateParagraph = (content) => {
    setItem({
      ...item,
      paragraph: content
    })
  };

  const clearInput = () => {
    setItem({
      ...item,
      headline: "",
      paragraph: "",
      ghim: false,
    });
  }

  const handleOnFocus = () => {
    setFocus(true);
  };

  const handleOutFocus = () => {
    setFocus(false);
    addNote(item);
    clearInput();
  };

  useEffect(() => {
    console.log(noteList);
  });

  return (
    <div className={style.createNote}>
      {focus ? (
        <>
          <ResizableTextInput
            className={style.inputHeading}
            value = {item.headline}
            lineHeight={26}
            type="text"
            placeholder="Add heading ..."
            onChange = {updateHeadline}
          />

          <ResizableTextInput
            className={style.inputContent}
            type="text"
            value = {item.paragraph}
            placeholder="Add content ..."
            onChange = {updateParagraph}
          />

          <div className={style.optionContainer}>
            <button
              className={style.buttonClose}
              onClick={() => handleOutFocus()}
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <input
          type="text"
          className={style.replaceInput}
          placeholder="Create a new note ..."
          onClick={() => handleOnFocus()}
        />
      )}
    </div>
  );
};

export default CreateNote;
