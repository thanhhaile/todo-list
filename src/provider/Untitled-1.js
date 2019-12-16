// const add = (a, b) => a + b;
const add = a =>  b => a + b;


// const addCurried = curry(add);
// const addCurried = curry(add);

add(5)(2);

const add10 = add(10);
const multiply10 = a => a * 10;

const transformItem = (item) => {
  //
  // return multiply10(add10(parseData(item)))
  //
}

// const transformItem = compose(multiply10, add10)
// _.pipe(add(10), multiply10);

[1,2,3].map(item => transformItem(item));
[1,2,3].map(transformItem);
[1,2,3].map((item) => {
  return multiply10(add10(item))
});

// [1,2,3].map(compose(multiply10, add10));



// setUser => update user context & save to localStorage
// setNote => update Note context & save to localStorage
// setCategory => update Category context & save to localStorage

// const saveToLocalStorage = data => {
//   // save to localStorage
//   localStorage.setItem('appState', JSON.stringify(data));

//   return data;
// }

// // {action, state} => newState
// const reducer = (action, state) => {
//   if (action.type === 'ADD_USER') {
//     return saveToLocalStorage({
//       ...state,
//       users: [...state.users, action.payload]
//     });
//   }
  
//   if (action.type === 'ADD_TODO') {
//     return saveToLocalStorage({
//       ...state,
//       users: [...state.users, action.payload]
//     });
//   }

//   return saveToLocalStorage(state);
// };

// const initialState = {
//   noteList: [],
//   noteList: [],
//   noteList: [],
//   noteList: []
// }

// const mergeState = (newState, state) => ({...state, ...newState})
// const replace = (newState) => newState;

// const [ state, setState ] = useReducer(replace)

// merge({
//   users: [1,2,3],
// })

// merge({
//   todos: [1,2,3],
//   users: [1,2,3],
// })

// dispatch({
//   type: 'SET_USER',
//   payload: 
// });

// dispatch({
//   type: 'SET_USER',
//   payload: 
// });

const betterArray = () => {

  const data = {}
  let ids = [];

  const hasItem = (id) => Boolean(data[id]);
  const deleteById = (id) => {
    const item = data[id];

    return ids.slice(item.internalIndex, 1);
  };

  const add = (item) => {
    const newIndex = ids.length;    

    data[item.id] = {
      ...item,
      internalIndex: newIndex
    };

    ids.push(item.id);
  };

  const getAll = () => {
    return ids.map(id => data[id]);
  }

  // 2 1 3 4
  const setIds = (newIds) => {
    ids = newIds;

    ids.forEach((id, index) => {
      data[id].internalIndex = index;
    })
  }

  return {
    hasItem,
    deleteById,
    add,
    getAll,
    setIds
  }
}

// A = (B) => C