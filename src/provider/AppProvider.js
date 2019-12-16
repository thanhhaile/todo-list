import React, { useState, useCallback } from "react";

import { AppContext } from "../context/AppContext";
import { saveListNew, getListNew } from "../utils/handleWithLocalStorage";

const AppProvider = ({ children }) => {
  const noteList1 = getListNew();

  const [noteList, setNoteList] = useState(noteList1);

  const [position, setPosition] = useState();

  const [editing, setEditing] = useState(false);

  const setList = newNoteList => {
    setNoteList(newNoteList);
    saveListNew(newNoteList);
  };

  //
  // list { list: { [item.id]: item }, order: [], orderPin: [] }
  //
  const setInternalIndex = useCallback(
    (newIds, list) => {
      const ids = newIds;

      ids.forEach((id, index) => {
        list[id].internalIndex = index;
      });
    }, []);

  const addNewNote = useCallback(
    item => {
      // let newIndex;
      // if (item.pin) {
      //   // newIndex = noteList.orderPin.length;
      //   noteList.orderPin.unshift(item.id);
      //   // noteList.orderPin.push(item.id);
      // } else {
      //   // newIndex = noteList.order.length;
      //   noteList.order.unshift(item.id);
      //   // noteList.order.push(item.id);
      // }
      item.pin ? noteList.orderPin.unshift(item.id) : noteList.order.unshift(item.id);
      const newNoteList = {
        list: {
          ...noteList.list,
          [item.id]: { ...item, internalIndex: 0 }
        },
        order: [...noteList.order],
        orderPin: [...noteList.orderPin]
      };

      setInternalIndex(item.pin ? newNoteList.orderPin : newNoteList.order, newNoteList.list );
      setList(newNoteList);
    },
    [noteList, setInternalIndex]
  );

  const addEditedNote = useCallback(
    item => {
      const newNoteList = {
        list: {
          ...noteList.list,
          [item.id]: { ...item }
        },
        order: [...noteList.order],
        orderPin: [...noteList.orderPin]
      };

      setList(newNoteList);
    },
    [noteList]
  );

 

  const deleteNote = useCallback(
    id => {
      const pin = noteList.list[id].pin;
      const index = noteList.list[id].internalIndex;
      let newOrder;
      let newOrderPin;

      if (pin) {
        newOrder = [...noteList.order];
        newOrderPin = [
          ...noteList.orderPin.slice(0, index),
          ...noteList.orderPin.slice(index + 1)
        ];
        // setInternalIndex(newOrderPin);
        setInternalIndex(newOrderPin, noteList.list );
        
      } else {
        newOrder = [
          ...noteList.order.slice(0, index),
          ...noteList.order.slice(index + 1)
        ];
        newOrderPin = [...noteList.orderPin];
        // setInternalIndex(newOrder);
        setInternalIndex(newOrder, noteList.list );
      }

      delete noteList.list[id];

      const newNoteList = {
        list: { ...noteList.list },
        order: newOrder,
        orderPin: newOrderPin
      };
      setList(newNoteList);
    },
    [noteList, setInternalIndex]
  );

  const togglePinItem = useCallback(
    id => {
      const pin = noteList.list[id].pin;
      const index = noteList.list[id].internalIndex;
      let newId, newOrder, newOrderPin;

      if (pin) {
        newId = noteList.order.length;
        newOrder = [...noteList.order];
        newOrder.unshift(id);
        newOrderPin = [
          ...noteList.orderPin.slice(0, index),
          ...noteList.orderPin.slice(index + 1)
        ];
      } else {
        newId = noteList.orderPin.length;
        newOrder = [
          ...noteList.order.slice(0, index),
          ...noteList.order.slice(index + 1)
        ];
        newOrderPin = [...noteList.orderPin];
        newOrderPin.unshift(id);
      }

      setInternalIndex(newOrder, noteList.list);
      setInternalIndex(newOrderPin, noteList.list);

      const newNoteList = {
        list: {
          ...noteList.list,
          [id]: { ...noteList.list[id], internalIndex: newId, pin: !pin }
        },
        order: newOrder,
        orderPin: newOrderPin
      };

      setList(newNoteList);
    },
    [noteList, setInternalIndex]
  );

  const contextValue = {
    noteList,
    setList,
    addNewNote,
    addEditedNote,
    deleteNote,
    setInternalIndex,
    // position of note
    position,
    setPosition,
    // editing note
    editing,
    setEditing,
    togglePinItem
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// import {
//   // saveList,
//   // getList,
//   // getOrder,
//   // saveOrder,
//   // getPinList,
//   // savePinList,
//   saveListNew,
//   getListNew
// } from "../utils/handleWithLocalStorage";

//   const list = getList();
//   const displayList = getOrder(); //------------
//   const pinListLocal = getPinList();

//   const [noteList, setNoteList] = useState(list);

//   const [orderList, setOrderList] = useState(displayList); //------------

//   const [pinList, setPinList] = useState(pinListLocal);

//   const [position, setPosition] = useState();

//   const [editing, setEditing] = useState(false);

//   const addNote = item => {
//     const newNoteList = { ...noteList, [item.id]: item };
//     let newOrderList = orderList;
//     if (!newOrderList.includes(item.id)) newOrderList.unshift(item.id);

//     saveList(newNoteList);
//     setNoteList(newNoteList);

//     // display order list
//     saveOrder(newOrderList);
//     setOrderList(newOrderList);
//   };

//   const deleteNote = id => {
//     delete noteList[id];
//     const index = orderList.findIndex(i => i === id);
//     orderList.splice(index, 1);

//     setNoteList({ ...noteList });
//     saveList(noteList);

//     // display order list
//     saveOrder(orderList);
//     setOrderList(orderList);
//   };

//   const addPinNote = item => {
//     const newOrderPinList = pinList.order;
//     if (!newOrderPinList.includes(item.id)) newOrderPinList.unshift(item.id)

//     const newPinNoteList = {
//       list: { ...pinList.list, [item.id]: item },
//       order: [...newOrderPinList]
//     };

//     savePinList(newPinNoteList);
//     setPinList(newPinNoteList);
//   };

//   const deletePinNote = id => {
//     delete pinList.list[id];
//     const index = pinList.order.findIndex(i => i === id);
//     pinList.order.splice(index, 1);

//     const newPinNoteList = {
//       list: { ...pinList.list },
//       order: [...pinList.order]
//     };
//     savePinList(newPinNoteList);
//     setPinList(newPinNoteList);
//   };

//   const completelyDelete = (id, pin) => {
//     pin ? deletePinNote(id) : deleteNote(id);
//   };

//   const contextValue = {
//     noteList,
//     setNoteList,
//     addNote,
//     deleteNote,
//     completelyDelete,
//     // position of note
//     position,
//     setPosition,
//     // editing note
//     editing,
//     setEditing,
//     // order list
//     orderList,
//     setOrderList,
//     // pin note list
//     pinList,
//     setPinList,
//     addPinNote,
//     deletePinNote,

//   };

//   return (
//     <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
//   );
// };

export default AppProvider;
