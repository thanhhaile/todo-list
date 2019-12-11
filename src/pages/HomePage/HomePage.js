import React, { useContext } from "react";
import { Route } from "react-router-dom";
import arrayMove from "array-move";

import { AppContext } from "../../context/AppContext";

import CreateNote from "../../components/CreateNotes/CreateNote";
import NoteItemFocus from "../../components/NoteItemFocus/NoteItemFocus";
import SortableList from "../../components/NoteLists/NoteLists";
// import NoteLists from "../../components/NoteLists/NoteLists";
import PinNoteList from "../../components/PinNoteList/PinNoteList";
import { saveOrder, savePinList } from "../../utils/handleWithLocalStorage";


const HomePage = () => {
  const { setOrderList, orderList, pinList, setPinList } = useContext(
    AppContext
  );

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const newOrderList = arrayMove(orderList, oldIndex, newIndex);

    saveOrder(newOrderList);
    setOrderList(newOrderList);

    // setOrderList((orderList) => (arrayMove(orderList, oldIndex, newIndex)));
  };

  const onSortEndPin = ({ oldIndex, newIndex }) => {
    const newPinList = arrayMove(pinList.order, oldIndex, newIndex);

    savePinList({ list: { ...pinList.list }, order: newPinList });
    setPinList({ list: { ...pinList.list }, order: newPinList });
  };

  const styleHeadline = {
    textAlign: "left",
    marginLeft: 30,
    marginBottom: 10
  };

  return (
    <>
      <CreateNote />
      {pinList.order.length ? (
        <h3 style={styleHeadline}>Notes have been pinned</h3>
      ) : (
        ""
      )}
      <PinNoteList onSortEnd={onSortEndPin} axis={"xy"} pressDelay={10} />

      {orderList.length && pinList.order.length ? (
        <h3 style={styleHeadline}>Others</h3>
      ) : (
        ""
      )}
      <SortableList onSortEnd={onSortEnd} axis={"xy"} pressDelay={10} />

      <Route path="/home/:id" component={NoteItemFocus} />
    </>
  );
};

export default HomePage;
