import React, { useRef, useContext, useLayoutEffect } from "react";
import classnames from "classnames";
import { useHistory } from "react-router-dom";

import { AppContext } from "../../context/AppContext";

import style from "./NoteItem.module.css";

const NoteItem = ({ item }) => {
  let resizeNote = useRef();
  const history = useHistory();

  const { deleteNote, setPosition, editing } = useContext(AppContext);

  
  useLayoutEffect(() => {
    if (editing === item.id) {
      const itemPosition = resizeNote.current.getBoundingClientRect();
      const newPosition = { 
        width: itemPosition.width,
        height: itemPosition.height,
        x: itemPosition.left,
        y: itemPosition.top, 
        id: item.id
      };

      setPosition(newPosition);
    }
  }, [editing, item, setPosition]);
  
  const editNote = id => {
    // setPosition(resizeNote.current.getBoundingClientRect()); ////
    history.push(`/home/${id}`);
  };

  return (
    <>
      <div
        className={classnames(style.noteItemContainer, {
          [style.isEditing]: editing === item.id
        })}
      >
        <div
          className={classnames(style.noteItem, {
            [style.isEditing]: editing === item.id
          })}
          onClick={() => editNote(item.id)}
          ref={resizeNote}
        >
          {item.headline || item.paragraph ? (
            <>
              <h3>{item.headline}</h3>
              <p>{item.paragraph}</p>
            </>
          ) : (
            <h2>Empty note</h2>
          )}
        </div>

        <div>
          <button
            className={style.deleteBtn}
            onClick={() => deleteNote(item.id)}
          >
            x
          </button>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
