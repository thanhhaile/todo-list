export const saveList = (list) => {
  localStorage.setItem('list', JSON.stringify(list))
}

export const getList = () => {
  if(localStorage['list']) {
    return JSON.parse(localStorage.getItem('list'));
  } else {
    localStorage.setItem('list', JSON.stringify({}))
    return JSON.parse(localStorage.getItem('list'));
  }
}

export const saveOrder = (orderList) => {
  localStorage.setItem('orderList', JSON.stringify(orderList))
}

export const getOrder = () => {
  if(localStorage['orderList']) {
    return JSON.parse(localStorage.getItem('orderList'));
  } else {
    localStorage.setItem('orderList', JSON.stringify([]))
    return JSON.parse(localStorage.getItem('orderList'));
  }
}


// export const saveItem = (item) => {
//   localStorage.setItem(`${item.id}` , JSON.stringify(item));
// };

// export const deleteItem = (id) => {
//   localStorage.removeItem(id);
// };

// export const getItem = (id) => {
//   return JSON.parse(localStorage.getItem(id));
// }

// export const getKeysArray = () => {
//   let keys = Object.keys(localStorage);

//   // find different solution
//   const sortedKeys = keys.map(item => parseInt(item, 10)).sort((a,b) => a-b); 

//   return sortedKeys; 
// }

// export const getAllStorage = () => {

//   let values = [];
//   const keys = getKeysArray();
//   let i = keys.length;

//   while ( i-- ) {
//     // console.log(localStorage.key(i)); 
//     values.push( JSON.parse(localStorage.getItem(keys[i])) );
//   }

//   return values;
// }