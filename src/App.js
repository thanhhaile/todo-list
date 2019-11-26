import React from 'react';
import CreateNote from './components/CreateNotes/CreateNote';
import NoteLists from './components/NoteLists/NoteLists';
import './App.css';

function App() {
  return (
    <div className="App">
      <CreateNote />
      <NoteLists />
    </div>
  );
}

export default App;
