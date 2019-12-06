export const saveList = (list) => {
  localStorage.setItem('list', JSON.stringify(list))
}

export const getList = () => {
  return JSON.parse(localStorage.getItem('list'));
}



export const saveItem = (item) => {
  localStorage.setItem(`${item.id}` , JSON.stringify(item));
};

export const deleteItem = (id) => {
  localStorage.removeItem(id);
};

export const getItem = (id) => {
  return JSON.parse(localStorage.getItem(id));
}

export const getKeysArray = () => {
  let keys = Object.keys(localStorage);

  // find different solution
  const sortedKeys = keys.map(item => parseInt(item, 10)).sort((a,b) => a-b); 

  return sortedKeys; 
}

export const getAllStorage = () => {

  let values = [];
  const keys = getKeysArray();
  let i = keys.length;

  while ( i-- ) {
    // console.log(localStorage.key(i)); 
    values.push( JSON.parse(localStorage.getItem(keys[i])) );
  }

  return values;
}