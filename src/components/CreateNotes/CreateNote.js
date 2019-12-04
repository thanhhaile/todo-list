import React, {
  useState,
  useEffect,
  useContext,
  // useCallback,
  useRef
} from "react";
import _ from "lodash";

import ResizableTextInput from "../ResizableTextInput/ResizableTextInput";
import { AppContext } from "../../context/AppContext";

import style from "./CreateNote.module.css";

const CreateNote = () => {
  const { addNote } = useContext(AppContext);

  const [focus, setFocus] = useState(false);

  const noteContainer = useRef();

  // console.log('render createNote')

  const [item, setItem] = useState({
    headline: "",
    paragraph: "",
    pin: false,
    id: ""
  });

  const updateHeadline = content => {
    setItem({
      ...item,
      headline: content
    });
  };

  const updateParagraph = content => {
    setItem({
      ...item,
      paragraph: content
    });
  };

  const clearInput = () => {
    setItem({
      ...item,
      headline: "",
      paragraph: "",
      pin: false
    });
  };

  const open = () => {
    setFocus(true);
    setItem({ ...item, id: _.uniqueId(`note-`) });
  };

  const close = () => {
    setFocus(false);
    // console.log('something is different 0');
    if (item.headline || item.paragraph) {
      addNote(item);
      // console.log('something is different 1');
    }
    clearInput();
  };

  const handleKeyWhenAdd = e => {
    if (e.key === "Escape" && focus) {
      console.log("escape 2")
      close()
    }
  };

  const handleClickWhenAdd = e => {
    // console.log(noteContainer.current.contains(e.target));
    if (focus && !noteContainer.current.contains(e.target)) {
      close();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyWhenAdd);
    window.addEventListener("click", handleClickWhenAdd);

    return () => {
      window.removeEventListener("keydown", handleKeyWhenAdd);
      window.removeEventListener("click", handleClickWhenAdd);
    };
  });

  return (
    <div className={style.createNote} ref={noteContainer}>
      {focus ? (
        <>
          <ResizableTextInput
            className={style.inputHeading}
            value={item.headline}
            lineHeight={26}
            type="text"
            placeholder="Add headline ..."
            onChange={updateHeadline}
          />

          <ResizableTextInput
            className={style.inputContent}
            type="text"
            value={item.paragraph}
            placeholder="Add content ..."
            onChange={updateParagraph}
          />

          <div className={style.optionContainer}>
            <button
              className={style.buttonClose}
              onClick={close}
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
          onClick={open}
        />
      )}
    </div>
  );
};

export default CreateNote;
