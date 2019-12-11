import React, {useContext} from "react";
import { Route } from "react-router-dom";

import CreateNote from "../../components/CreateNotes/CreateNote";

import NoteItemFocus from "../../components/NoteItemFocus/NoteItemFocus";
import SortableList from "../../components/NoteLists/NoteLists";
// import NoteLists from "../../components/NoteLists/NoteLists";
import arrayMove from 'array-move';
import { AppContext } from "../../context/AppContext";
import { saveOrder } from "../../utils/handleWithLocalStorage";


const HomePage = () => {

  const {setOrderList, orderList } =  useContext(AppContext);

  const onSortEnd = ({oldIndex, newIndex}) => {
    const newOrderList = arrayMove(orderList, oldIndex, newIndex);

    saveOrder(newOrderList);
    setOrderList(newOrderList);

    // setOrderList((orderList) => (arrayMove(orderList, oldIndex, newIndex)));
  };

  return (
    <>
      <CreateNote />
      <SortableList onSortEnd={onSortEnd} axis={'xy'} pressDelay={10} />
      <Route path="/home/:id" component={NoteItemFocus} />
    </>
  );
};

export default HomePage;
