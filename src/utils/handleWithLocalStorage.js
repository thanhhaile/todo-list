
//
// list { items: { [item.id]: item }, order: [], orderPin: [] }
//
// better note list
export const saveListNew = list => {
  localStorage.setItem("list", JSON.stringify(list));
};

export const getListNew = () => {
  if (localStorage["list"]) {

    return JSON.parse(localStorage.getItem("list"));

  } else {

    localStorage.setItem(
      "list",
      JSON.stringify({ list: {}, order: [], orderPin: [] })
    );
    return JSON.parse(localStorage.getItem("list"));
  }
};
