import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useLayoutEffect
} from "react";
import classnames from "classnames";

import { AppContext } from "../../context/AppContext";
import ResizableTextInput from "../ResizableTextInput/ResizableTextInput";

import styles from "./NoteItemFocus.module.css";

const NoteItemFocus = ({ history, match }) => {
  const {
    position,
    setEditing,
    noteList,
    addEditedNote,
  } = useContext(AppContext);

  const [animate, setAnimate] = useState(false);

  const { id } = match.params;
  const editItem = noteList.list[id];

  const [item, setItem] = useState({
    headline: editItem.headline,
    paragraph: editItem.paragraph,
    pin: editItem.pin,
    id: editItem.id,
    internalIndex: editItem.internalIndex
  });

  useLayoutEffect(() => {
    setEditing(parseInt(id));
  }, [id, setEditing]);

  let style = {};
  if (position && position.id === parseInt(id)) {
    style.top = `${position.y}px`;
    style.left = `${position.x}px`;
    style.width = `${position.width}px`;
    style.height = `${position.height}px`;
  }

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
    // item.pin ? addPinNote(item) : addNote(item);
    addEditedNote(item);
    setAnimate(false);
    setTimeout(() => {
      setEditing(false);
      history.push(`/`);
    }, 300);
  }, [addEditedNote, item, setEditing, history]);

  const handleKeyWhenEdit = useCallback(
    e => {
      if (e.key === "Escape") {
        handleOutEditing();
      }
    },
    [handleOutEditing]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleKeyWhenEdit);

    return () => {
      document.removeEventListener("keyup", handleKeyWhenEdit);
    };
  }, [handleKeyWhenEdit, handleOutEditing]);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 100);
  }, [setAnimate]);

  return (
    <>
      <div
        className={classnames(styles.overlay, {
          [styles.showOverlay]: animate
        })}
        onClick={handleOutEditing}
      />

      <div
        className={classnames(styles.noteItemFocus, {
          [styles.showEditItem]: animate
        })}
        style={style}
      >
        <ResizableTextInput
          className={styles.inputHeading}
          value={item.headline}
          lineHeight={26}
          type="text"
          onChange={updateHeadline}
          placeholder="Add headline ..."
          editing
        />

        <ResizableTextInput
          className={styles.inputContent}
          value={item.paragraph}
          lineHeight={21}
          type="text"
          onChange={updateParagraph}
          editing
        />

        <div className={styles.optionContainer}>
          <button className={styles.buttonClose} onClick={handleOutEditing}>
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default NoteItemFocus;
