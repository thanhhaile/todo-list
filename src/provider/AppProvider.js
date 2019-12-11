import React, { useState } from "react";

import { AppContext } from "../context/AppContext";
import {
  saveList,
  getList,
  getOrder,
  saveOrder,
  getPinList,
  savePinList
} from "../utils/handleWithLocalStorage";

const AppProvider = ({ children }) => {
  const list = getList();
  const displayList = getOrder(); //------------
  const pinListLocal = getPinList();

  const [noteList, setNoteList] = useState(list);

  const [orderList, setOrderList] = useState(displayList); //------------

  const [pinList, setPinList] = useState(pinListLocal);

  const [position, setPosition] = useState();

  const [editing, setEditing] = useState(false);

  const addNote = item => {
    const newNoteList = { ...noteList, [item.id]: item };
    let newOrderList = orderList;
    if (!newOrderList.includes(item.id)) newOrderList.unshift(item.id);

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

  const addPinNote = item => {
    const newOrderPinList = pinList.order;
    if (!newOrderPinList.includes(item.id)) newOrderPinList.unshift(item.id);

    const newPinNoteList = {
      list: { ...pinList.list, [item.id]: item },
      order: [...newOrderPinList]
    };

    savePinList(newPinNoteList);
    setPinList(newPinNoteList);
  };

  const deletePinNote = id => {
    delete pinList.list[id];
    const index = pinList.order.findIndex(i => i === id);
    pinList.order.splice(index, 1);

    const newPinNoteList = {
      list: { ...pinList.list },
      order: [...pinList.order]
    };
    savePinList(newPinNoteList);
    setPinList(newPinNoteList);
  };

  const completelyDelete = (id, pin) => {
    pin ? deletePinNote(id) : deleteNote(id);
  };

  const contextValue = {
    noteList,
    setNoteList,
    addNote,
    deleteNote,
    completelyDelete,
    // position of note
    position,
    setPosition,
    // editing note
    editing,
    setEditing,
    // order list
    orderList,
    setOrderList,
    // pin note list
    pinList,
    setPinList,
    addPinNote,
    deletePinNote
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
