import React, { useContext } from 'react';

import { values } from '../../utils/ObjectToArray';

import { AppContext } from '../../context/AppContext';
import NoteItem from '../NoteItem/NoteItem';

const NoteLists = () => {

  const { noteList } = useContext(AppContext);
  
  return (
    <div>
      {values(noteList).map(note => (
        <NoteItem key={note.id} item={note} />
      ))}
    </div>
  )
};

export default NoteLists;