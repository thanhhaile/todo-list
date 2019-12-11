import React, { useState } from "react";


import { AppContext } from "../context/AppContext";
import { saveList, getList, getOrder, saveOrder } from "../utils/handleWithLocalStorage";

const AppProvider = ({ children }) => {

  const list = getList();
  const displayList = getOrder(); //------------

  const [noteList, setNoteList] = useState(list);

  const [orderList, setOrderList] = useState(displayList); //------------

  const [position, setPosition] = useState();

  const [editing, setEditing] = useState(false);

  const addNote = item => {
    const newNoteList = { ...noteList, [item.id]: item };
    let newOrderList = orderList;
    if(!newOrderList.includes(item.id)) newOrderList.unshift(item.id)

    saveList(newNoteList);
    setNoteList(newNoteList);

    // display order list
    saveOrder(newOrderList);
    setOrderList(newOrderList);
  };

  const deleteNote = id => {
    delete noteList[id];
    const index = orderList.findIndex(i => i === id);
    orderList.splice(index, 1);

    setNoteList({ ...noteList });
    saveList(noteList);

    // display order list
    saveOrder(orderList);
    setOrderList(orderList);
  };

  const contextValue = {
    noteList,
    setNoteList,
    addNote,
    deleteNote,
    position,
    setPosition,
    editing,
    setEditing,
    orderList,
    setOrderList
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
