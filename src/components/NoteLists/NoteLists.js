import React, { useContext } from "react";
import classnames from "classnames";
import Masonry from "react-masonry-component";

import { values } from "../../utils/ObjectToArray";
import { AppContext } from "../../context/AppContext";
import NoteItem from "../NoteItem/NoteItem";

import style from "./NoteList.module.css";

const NoteLists = () => {
  const { noteList } = useContext(AppContext);

  return (
    <Masonry className={classnames(style.noteList, {})}>
      {values(noteList)
        .reverse()
        .map(item => (
          <NoteItem key={item.id} item={item} />
        ))}
    </Masonry>
  );
};

export default NoteLists;
