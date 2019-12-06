import React from "react";
import { Route } from "react-router-dom";

import CreateNote from "../../components/CreateNotes/CreateNote";

import NoteItemFocus from "../../components/NoteItemFocus/NoteItemFocus";
import NoteLists from "../../components/NoteLists";

const HomePage = () => {
  return (
    <>
      <CreateNote />
      <NoteLists />
      <Route path="/home/:id" component={NoteItemFocus} />
    </>
  );
};

export default HomePage;
