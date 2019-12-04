import React from 'react';
import CreateNote from '../../components/CreateNotes/CreateNote';
import NoteLists from '../../components/NoteLists/NoteLists';

const HomePage = () => {

  return (
    <>
      <CreateNote />
      <NoteLists />
    </>
  )
}

export default HomePage;