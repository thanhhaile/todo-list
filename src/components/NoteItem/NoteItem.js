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
import NoteItemFocus from "../NoteItemFocus/NoteItemFocus";

import { ResizeNoteItem } from "./NoteItem.style";
import style from "./NoteItem.module.css";

const NoteItem = ({ item, rowHeight = 15, history, gap = 10 }) => {

  // let rowNum = useRef();
  // let resizeNoteContainer = useRef();

  let resizeNote = useRef();

  const { deleteNote } = useContext(AppContext);

  const [isEditing, setIsEditing] = useState(false);

  // const [resize, setResize] = useState(false);

  const [ resizeRow, setResizeRow ] = useState(false);

  const [position, setPosition] = useState();

  const editNote = id => {
    console.log(resizeNote.current, position);

    setIsEditing(true);

    //change url
    history.push(`/home/${id}`);
  };

  const calcSpanRow = useCallback(() => {
    // debugger
    console.log('calc span rowwwwwww');

    console.log(resizeNote.current.clientHeight);


    // craete dummy div with new content
    // get height 

    const newRowValue = Math.ceil(resizeNote.current.clientHeight / (rowHeight + gap));

    console.log({newRowValue})

    setResizeRow(newRowValue);

    
    // rowNum.current = Math.ceil(resizeNote.current.clientHeight / (rowHeight + gap));
    // setResize(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowHeight, gap, item]);


  useEffect(() => {

    calcSpanRow();

    document.addEventListener("resize", calcSpanRow);

    return () => {
      document.removeEventListener("resize", calcSpanRow);
    };

  }, [calcSpanRow]);

  const handleHover = () => {

    setPosition(resizeNote.current.getBoundingClientRect());

    // console.log(resizeNote.current, position);
  };

  return (
    <>
      <ResizeNoteItem
        rowNum={resizeRow}
        // rowNum={rowNum.current}
        className={classnames(style.noteItemContainer, {
          // [style.resize]: resizeRow,
          // [style.resize]: resize,
          [style.isEditing]: isEditing,
        })}
        // ref={resizeNoteContainer}
      >
        <div
          onMouseEnter={handleHover}
          className={classnames(style.noteItem, {
            // [style.resize]: resizeRow,
            // [style.resize]: resize,
            [style.isEditing]: isEditing,
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
      </ResizeNoteItem>

      <NoteItemFocus
        isEditing={isEditing}
        editItem={item}
        setIsEditing={setIsEditing}
        position={position}
        calcSpanRow={calcSpanRow}
        // setResize={setResize}
        // resize={resize}
      />
    </>
  );
};

export default withRouter(NoteItem);
