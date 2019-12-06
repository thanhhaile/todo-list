import React, { useState } from "react";

import { AppContext } from "../context/AppContext";
import { saveList, getList } from "../utils/handleWithLocalStorage";

const AppProvider = ({ children }) => {

  const [noteList, setNoteList] = useState(getList());

  const [position, setPosition] = useState();

  const [editing, setEditing] = useState(false);

  const addNote = item => {
    const newNoteList = { ...noteList, [item.id]: item };

    setNoteList(newNoteList);
    saveList(newNoteList);
  };

  const deleteNote = id => {
    delete noteList[id];

    setNoteList({ ...noteList });
    saveList(noteList);
  };

  const contextValue = {
    noteList,
    addNote,
    deleteNote,
    position,
    setPosition,
    editing,
    setEditing
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
