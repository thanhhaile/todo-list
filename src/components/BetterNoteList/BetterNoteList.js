import React from "react";
import classnames from "classnames";
import Masonry from "react-masonry-component";
import { SortableContainer } from "react-sortable-hoc";
import NoteItem from "../NoteItem/NoteItem";

import style from "./BetterNoteList.module.css";

const BetterNoteList = SortableContainer(({ list, order }) => {
  if (!list || !order) return null;

  // const newOrder = [...order];

  return (
    <Masonry className={classnames(style.noteList)}>
      {order.map((id, index) => (
        <NoteItem key={id} item={list[id]} index={index} />
      ))}
    </Masonry>
  );
});

export default BetterNoteList;
