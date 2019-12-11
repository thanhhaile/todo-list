// note list
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

// order list 
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

// pin note list
export const savePinList = (pinList) => {
  localStorage.setItem('pinList', JSON.stringify(pinList));
}
export const getPinList = () => {
  if(localStorage['pinList']) {
    return JSON.parse(localStorage.getItem('pinList'));
  } else {
    // localStorage.setItem('pinList', JSON.stringify({}))
    localStorage.setItem('pinList', JSON.stringify({list: {}, order:[]}))
    return JSON.parse(localStorage.getItem('pinList'));
  }
}