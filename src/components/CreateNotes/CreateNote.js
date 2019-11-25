import React, {useState} from 'react';

import style from './CreateNote.module.css';

const CreateNote = () => {

  const [focus, setFocus] = useState(false);

  const handleOnFocus = () => {
    setFocus(true);
  };
  
  const handleOutFocus = () => {
    setFocus(false);
  };

  return (

    <div className={style.createNote} >

      {focus ? (
        <>
          <input type='text' placeholder='Adđ heading ...'  />
          <input type='text' placeholder='Add content ...'  />
          <button onClick={() => handleOutFocus()}>
            Close
          </button>
        </>
        ) : (
          <input type='text' placeholder='Add heading ...' onClick={() => handleOnFocus()} />
        )
      }
    </div>
  );
};

export default CreateNote;