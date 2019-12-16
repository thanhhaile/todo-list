import React, { useContext, useCallback } from "react";
import { Route } from "react-router-dom";
import arrayMove from "array-move";

import { AppContext } from "../../context/AppContext";

import CreateNote from "../../components/CreateNotes/CreateNote";
import NoteItemFocus from "../../components/NoteItemFocus/NoteItemFocus";
import BetterNoteList from "../../components/BetterNoteList/BetterNoteList";

const HomePage = () => {
  const { noteList, setList, setInternalIndex } = useContext(AppContext);

  const onSortEndHandle = useCallback(
    (oldIndex, newIndex, orderList, pin) => {
      const newOrderList = arrayMove(orderList, oldIndex, newIndex);

      setInternalIndex(newOrderList, noteList.list);

      // let newList = {
      //   ...noteList,
      //   order: pin === 'pin' ? [...noteList.order] : [...newOrderList],
      //   orderPin: pin === 'not-pin' ? [...newOrderList] : [...noteList.orderPin]
      // }

      let newList;
      if (pin === "pin") {
        newList = {
          list: { ...noteList.list },
          order: [...noteList.order],
          orderPin: [...newOrderList]
        };
      } else {
        newList = {
          list: { ...noteList.list },
          order: [...newOrderList],
          orderPin: [...noteList.orderPin]
        };
      }
      setList(newList);
    },
    [noteList, setInternalIndex, setList]
  );

  const styleHeadline = {
    textAlign: "left",
    marginLeft: 30,
    marginBottom: 10
  };

  return (
    <>
      <CreateNote />

      {noteList.orderPin.length > 0 && (
        <h3 style={styleHeadline}>Notes have been pinned</h3>
      )}

      <BetterNoteList
        axis={"xy"} 
        pressDelay={200}
        order={noteList.orderPin}
        list={noteList.list}
        onSortEnd={({ oldIndex, newIndex }) =>
          onSortEndHandle(oldIndex, newIndex, noteList.orderPin, "pin")
        }
      />

      {noteList.order.length > 0 && noteList.orderPin.length > 0 && (
        <h3 style={styleHeadline}>Others</h3>
      )}

      <BetterNoteList
        axis={"xy"}
        pressDelay={200}
        order={noteList.order}
        list={noteList.list}
        onSortEnd={({ oldIndex, newIndex }) =>
          onSortEndHandle(oldIndex, newIndex, noteList.order, "not-pin")
        }
      />

      <Route path="/home/:id" component={NoteItemFocus} />
    </>
  );
};

export default HomePage;
