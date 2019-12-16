import React, { useRef, useContext, useLayoutEffect } from "react";
import classnames from "classnames";
import { useHistory } from "react-router-dom";
import { SortableElement } from "react-sortable-hoc";

import { AppContext } from "../../context/AppContext";

import style from "./NoteItem.module.css";

const NoteItem = SortableElement(({ item, index }) => {
  let resizeNote = useRef();
  const history = useHistory();

  const {
    setPosition,
    editing,
    deleteNote,
    togglePinItem,
  } = useContext(AppContext);

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

  // const togglePin = id => {
  //   const newItem = { ...item, pin: !item.pin };
  //   if (item.pin) {
  //     addNote(newItem);
  //     deletePinNote(item.id);
  //   } else {
  //     addPinNote(newItem);
  //     deleteNote(item.id);
  //   }
  // };

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
            className={classnames(style.pin, {
              [style.pinned]: item.pin
            })}
            onClick={() => togglePinItem(item.id)}
          >
            <i className="fa fa-map-pin"></i>
          </button>
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
});

export default NoteItem;
