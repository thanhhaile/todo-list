import React, { useContext } from 'react';
import classnames from 'classnames';

import { values } from '../../utils/ObjectToArray';
import { AppContext } from '../../context/AppContext';
import NoteItem from '../NoteItem/NoteItem';

import style from './NoteList.module.css';

const NoteLists = () => {

  const { noteList } = useContext(AppContext);

  let fullWidth = false;

  if (values(noteList).length > 3) {
    fullWidth = true;
  }
  
  return (
    <div className={classnames(style.noteList, {
      [style.responsive] : fullWidth
    })} >
      {values(noteList).reverse().map((note, index) => (
        <NoteItem key={note.id} item={note} />
      ))}
    </div>
  )
};

export default NoteLists;