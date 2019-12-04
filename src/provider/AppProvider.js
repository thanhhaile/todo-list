import React, { useState } from 'react';
import { AppContext } from '../context/AppContext';

const AppProvider = ({children}) => {

  const [noteList, setNoteList] = useState({});

  // console.log(noteList);
  console.log('re render');
  
  const addNote = (item) => {
    console.log( 'add itemmmm')
    setNoteList({
      ...noteList,
      [item.id]: item
    });
  }

  const deleteNote = (id) => {
    delete noteList[id];
    setNoteList({ ...noteList })


    this.setState({
      item: this.state.item + 1
    });

    this.setState(state => ({
      item: state.item + 1
    }));
  }


  const contextValue = {
    noteList,
    addNote,
    deleteNote,
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;