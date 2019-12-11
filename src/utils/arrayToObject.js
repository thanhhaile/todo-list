export const keyBy = (arr, key) => {
  
  return arr.reduce((acc, item) => {
    return {
      ...acc,
      [item[key]]: item
    }
  }, {});
};