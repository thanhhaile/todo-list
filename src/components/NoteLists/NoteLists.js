import React, { useContext } from "react";
import classnames from "classnames";
import Masonry from 'react-masonry-component';
import {SortableContainer} from 'react-sortable-hoc';
// import Muuri from 'muuri';

// import { values } from "../../utils/ObjectToArray";
import { AppContext } from "../../context/AppContext";
import NoteItem from "../NoteItem";

import style from "./NoteList.module.css";

const SortableList = SortableContainer(() => {
  const { noteList, orderList } = useContext(AppContext);
  
  if (!noteList) return null;
  
  return (
    <Masonry className={classnames(style.noteList)}>
      {orderList.map((id, index) => (
        <NoteItem
        key={id}
        item={noteList[id]}
        index={index}
        />
        ))}
    </Masonry>
  );
});

export default SortableList;

// const NoteLists = () => {
//   const { noteList, orderList, setOrderList } = useContext(AppContext);
  // const ref = useRef();
  // const listArray = values(noteList);

 
  // useEffect(() => {
  //   Muuri.defaultOptions.dragEnabled = true;
  //   Muuri.defaultOptions.showDuration = 400;
  //   new Muuri(ref.current)
  // }, [noteList]) 

  // const onSortEnd = ({oldIndex, newIndex}) => {
  //   setOrderList((orderList) => (arrayMove(orderList, oldIndex, newIndex)));
  // };

  // const SortableList = SortableContainer(({orderList}) => {
  //   return (
  //     <Masonry className={classnames(style.noteList)}>
  //       {orderList.map((id, index) => (
  //       // {listArray.reverse().map((item, index) => (
  //         <NoteItem
  //         key={id}
  //         item={noteList[id]}
  //         index={index}
  //         />
  //       ))}
  //     </Masonry>
  //   );
  // });
  
  // if (!noteList) return null;
  
  // return (

    // <div className={classnames(style.noteList)}>
    //   {listArray.reverse().map((item, index) => (
    //     <NoteItem
    //     key={item.id}
    //     item={item}
    //     draggable
    //     />
    //   ))}
    // </div>
    
    // <div className={classnames(style.noteList)} ref={ref}>
    //   {listArray.reverse().map((item, index) => (
    //     <NoteItem
    //     key={item.id}
    //     item={item}
    //     draggable
    //     />
    //   ))}
    // </div>

    // <SortableList orderList={orderList} onSortEnd={onSortEnd} axis={'xy'} pressDelay={100}/>

    // <Masonry className={classnames(style.noteList)}>
    //   {orderList.map((id, index) => (
    //   // {listArray.reverse().map((item, index) => (
    //     <NoteItem
    //     key={id}
    //     item={noteList[id]}
    //     draggable
    //     index={index}
    //     />
    //   ))}
    // </Masonry>
//   );
// };
// export default NoteLists;