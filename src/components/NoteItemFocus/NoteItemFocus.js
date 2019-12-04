import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef
} from "react";
import classnames from "classnames";
import { withRouter } from "react-router-dom";

import { AppContext } from "../../context/AppContext";
import ResizableTextInput from "../ResizableTextInput/ResizableTextInput";

import styles from "./NoteItemFocus.module.css";

const NoteItemFocus = ({
  editItem,
  setIsEditing,
  isEditing,
  history,
  position,
  calcSpanRow,
  // resize,
  // setResize
}) => {
  const newItem = useRef();
  const overlay = useRef();

  // console.log(position);

  if (!isEditing && position) {
    newItem.current.style.top = `${position.y}px`;
    newItem.current.style.left = `${position.x}px`;
    newItem.current.style.width = `${position.width}px`;
    newItem.current.style.height = `${position.height}px`;
  }

  const { addNote } = useContext(AppContext);

  const [item, setItem] = useState({
    headline: editItem.headline,
    paragraph: editItem.paragraph,
    pin: editItem.pin,
    id: editItem.id,
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
  
  const handleOutEditing = useCallback(() => {
    console.log(item);
    addNote(item);
    // console.log('calcccccccc');
    // calcSpanRow();
    setIsEditing(false);
    history.push(`/home`);

  }, [addNote, setIsEditing, history, item]);

  const handleKeyWhenEdit = useCallback(e => {
      if ((e.key === "Escape" || !e.key) && isEditing) {
        console.log("escape 1")
        handleOutEditing();
      }
    },
    [isEditing, handleOutEditing]
  );

  useEffect(() => {

    const overlayElement = overlay.current;

    document.addEventListener("keyup", handleKeyWhenEdit);
    overlayElement.addEventListener('click', handleOutEditing)
    // document.getElementById('btn').addEventListener('click', handleKeyWhenEdit)

    return () => {
      document.removeEventListener("keyup", handleKeyWhenEdit);
      overlayElement.removeEventListener('click', handleOutEditing)
      // document.getElementById('btn').removeEventListener('click', handleKeyWhenEdit)
    };
  }, [handleKeyWhenEdit, handleOutEditing]);

  return (
    <>
      <div
        id='btn'
        className={classnames(styles.overlay, {
          [styles.showOverlay]: isEditing
        })}
        ref={overlay}
        // onClick
      />

      <div
        className={classnames(styles.noteItemFocus, {
          [styles.showEditItem]: isEditing
        })}
        ref={newItem}
      >
        <ResizableTextInput
          className={styles.inputHeading}
          value={item.headline}
          lineHeight={26}
          type="text"
          onChange={updateHeadline}
          placeholder="Add headline ..."
          isEditing={isEditing}
        />

        <ResizableTextInput
          className={styles.inputContent}
          value={item.paragraph}
          lineHeight={21}
          type="text"
          onChange={updateParagraph}
          isEditing={isEditing}
        />

        <div className={styles.optionContainer}>
          <button
            className={styles.buttonClose}
            onClick={handleOutEditing}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default withRouter(NoteItemFocus);


