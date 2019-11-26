import React, { useState } from 'react';
import { AppContext } from '../context/AppContext';

const AppProvider = ({children}) => {

  const [noteList, setNoteList] = useState({});

  const addNote = (item) => {
    // add something
    setNoteList({
      ...noteList,
      [item.id]: item
    });
  }

  // const deleteNote = (id) => {
  //   // delete note
  // }

  // const editNote = (id) => {

  // }

  const contextValue = {
    noteList,
    addNote,

  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;