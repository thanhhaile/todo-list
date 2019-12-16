import React, {
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";

import ResizableTextInput from "../ResizableTextInput/ResizableTextInput";
import { AppContext } from "../../context/AppContext";

import style from "./CreateNote.module.css";

const CreateNote = () => {
  
  const { addNewNote, noteList } = useContext(AppContext);

  const [focus, setFocus] = useState(false);

  const noteContainer = useRef();

  const [item, setItem] = useState({
    headline: "",
    paragraph: "",
    pin: false,
    id: ""
  });

  const updateHeadline = content => {
    setItem({
      ...item,
      headline: content
    });
  };

  const updateParagraph = content => {
    setItem({
      ...item,
      paragraph: content
    });
  };

  const clearInput = () => {
    setItem({
      ...item,
      headline: "",
      paragraph: "",
      pin: false
    });
  };

  const open = () => {
    setFocus(true);
    let newId;
    if(noteList.list) {
      let keys = Object.keys(noteList.list);  
      newId = keys.length > 0 ? parseInt(keys[keys.length - 1]) + 1 : 0;
    } else {
      newId = 0;
    }
    
    setItem({ ...item, id: newId });
  };

  const close = () => {
    setFocus(false);

    if (item.headline || item.paragraph) {
      addNewNote(item);
    }
    clearInput();
  };

  const handleKeyWhenAdd = e => {
    if (e.key === "Escape" && focus) {
      close()
    }
  };

  const handleClickWhenAdd = e => {
    if (focus && !noteContainer.current.contains(e.target)) {
      close();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyWhenAdd);
    window.addEventListener("click", handleClickWhenAdd);

    return () => {
      window.removeEventListener("keydown", handleKeyWhenAdd);
      window.removeEventListener("click", handleClickWhenAdd);
    };
  });

  return (
    <div className={style.createNote} ref={noteContainer}>
      {focus ? (
        <>
          <ResizableTextInput
            className={style.inputHeading}
            value={item.headline}
            lineHeight={26}
            type="text"
            placeholder="Add headline ..."
            onChange={updateHeadline}
          />

          <ResizableTextInput
            className={style.inputContent}
            type="text"
            value={item.paragraph}
            placeholder="Add content ..."
            onChange={updateParagraph}
          />

          <div className={style.optionContainer}>
            <button
              className={style.buttonClose}
              onClick={close}
            >
              Close
            </button>
          </div>
        </>
      ) : (
        <input
          type="text"
          className={style.replaceInput}
          placeholder="Create a new note ..."
          onClick={open}
        />
      )}
    </div>
  );
};


//   const { addNote, noteList } = useContext(AppContext);

//   const [focus, setFocus] = useState(false);

//   const noteContainer = useRef();

//   const [item, setItem] = useState({
//     headline: "",
//     paragraph: "",
//     pin: false,
//     id: ""
//   });

//   const updateHeadline = content => {
//     setItem({
//       ...item,
//       headline: content
//     });
//   };

//   const updateParagraph = content => {
//     setItem({
//       ...item,
//       paragraph: content
//     });
//   };

//   const clearInput = () => {
//     setItem({
//       ...item,
//       headline: "",
//       paragraph: "",
//       pin: false
//     });
//   };

//   const open = () => {
//     setFocus(true);
//     let newId;
//     if(noteList) {
//       let keys = Object.keys(noteList);  
//       newId = keys.length > 0 ? parseInt(keys[keys.length - 1]) + 1 : 0;
//     } else {
//       newId = 0;
//     }
    
//     setItem({ ...item, id: newId });
//   };

//   const close = () => {
//     setFocus(false);

//     if (item.headline || item.paragraph) {
//       addNote(item);
//     }
//     clearInput();
//   };

//   const handleKeyWhenAdd = e => {
//     if (e.key === "Escape" && focus) {
//       close()
//     }
//   };

//   const handleClickWhenAdd = e => {
//     if (focus && !noteContainer.current.contains(e.target)) {
//       close();
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyWhenAdd);
//     window.addEventListener("click", handleClickWhenAdd);

//     return () => {
//       window.removeEventListener("keydown", handleKeyWhenAdd);
//       window.removeEventListener("click", handleClickWhenAdd);
//     };
//   });

//   return (
//     <div className={style.createNote} ref={noteContainer}>
//       {focus ? (
//         <>
//           <ResizableTextInput
//             className={style.inputHeading}
//             value={item.headline}
//             lineHeight={26}
//             type="text"
//             placeholder="Add headline ..."
//             onChange={updateHeadline}
//           />

//           <ResizableTextInput
//             className={style.inputContent}
//             type="text"
//             value={item.paragraph}
//             placeholder="Add content ..."
//             onChange={updateParagraph}
//           />

//           <div className={style.optionContainer}>
//             <button
//               className={style.buttonClose}
//               onClick={close}
//             >
//               Close
//             </button>
//           </div>
//         </>
//       ) : (
//         <input
//           type="text"
//           className={style.replaceInput}
//           placeholder="Create a new note ..."
//           onClick={open}
//         />
//       )}
//     </div>
//   );
// };

export default CreateNote;
