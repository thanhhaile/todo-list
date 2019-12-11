import React, { useContext } from 'react';
import classnames from "classnames";
import Masonry from 'react-masonry-component';
import {SortableContainer} from 'react-sortable-hoc';

import { AppContext } from '../../context/AppContext';
import NoteItem from '../NoteItem/NoteItem';

import style from './PinNoteList.module.css';

const PinNoteList = SortableContainer(() => {

  const { pinList } = useContext(AppContext);

  if (!pinList.list) return null;

  return (
    <Masonry className={classnames(style.pinNoteList)}>
      {pinList.order.map((id, index) => (
        <NoteItem
        key={id}
        item={pinList.list[id]}
        index={index}
        />
      ))}
    </Masonry>
  )
});

export default PinNoteList;