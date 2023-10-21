const txt_input = document.querySelector("#todo-txt");
const save_button = document.querySelector("#save-btn");
const list = document.querySelector(".list");
const del_some_btn = document.querySelector("#delete-some-btn");
const select_items = document.querySelector(".done_filter");
const search_txt = document.querySelector("#search-txt");
const search_btn = document.querySelector("#search-btn");
//typeof list = object

let todoArray = [];

//work with DOM
function renderItem(todo_item) {
  //create <div class="item">
  const item = document.createElement("div");
  item.classList.add("item");

  //create <input type="checkbox">
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo_item.status;

  //create <span> item1 </span>
  const span = document.createElement("span");
  span.textContent = todo_item.title;

  //create <button type="submit>Delete</delete>"
  const del_btn = document.createElement("button");
  del_btn.textContent = "Delete";
  del_btn.classList.add("delete_btn");

  item.appendChild(checkbox);
  item.appendChild(span);
  item.appendChild(del_btn);

  list.appendChild(item);
  checkbox.addEventListener("click", () => {
    toggleStatus(todo_item.title);
    // console.log("listtoggle", todoArray);
  });

  del_btn.addEventListener("click", () => {
    removerAnItem(todo_item.title);
    // console.log("list", todoArray);
  });
}

function clearTextBox() {
  txt_input.value = "";
}
function renderList() {
  list.innerHTML = "";
  for (let i = 0; i < todoArray.length; i++) {
    item = todoArray[i];
    renderItem(item);
  }
}

//Functionality
function toggleStatus(title) {
  for (let i = 0; i < todoArray.length; i++) {
    if (todoArray[i].title === title) {
      // list_item.status = list_item.status ? false : true;
      todoArray[i].status = !todoArray[i].status;
    }
  }
  console.log("todoarr", todoArray);
  syncStorage();
}

function removerAnItem(title) {
  //find specific item:
  for (let i = 0; i < todoArray.length; i++) {
    //console.log(todoArray[i].title, title)
    if (todoArray[i].title === title) {
      todoArray.splice(i, 1);
    }
  }
  syncStorage();
  renderList();
}

function addItem(item) {
  const nextItem = {
    title: item.title,
    status: item.status,
  };
  todoArray.push(nextItem);

  syncStorage();
}

//Work with storage:
function syncStorage() {
  const newList = JSON.stringify(todoArray);
  localStorage.setItem("myList", newList);
}

//Work with storage:
function loadFromStorage() {
  const storageList = JSON.parse(localStorage.getItem("myList")) || [];
  todoArray = storageList;
}

function OnAddItem() {
  const val = txt_input.value;

  if (val === "") {
    alert("Please Fill the Text Area");
  } else {
    const item = {
      title: val,
      status: false,
    };
    addItem(item);
    syncStorage();
    renderItem(item);
    clearTextBox();

    //convert a java array to json string :JSON.stringify(arrya) Opp of JSON.pase(string)
    // const myCollection = JSON.stringify(todoArray);

    // consol e.log( typeof todoArray);    ...>object=Array
    // console.log(typeof myCollection);  ....>string
  }
}

function onDelSomeItems() {
  const delSomeArr = todoArray.filter((item) => {
    if (item.status === false) return true;
    else return false;
  });
  console.log("delSomeArr", delSomeArr);

  todoArray = delSomeArr;

  syncStorage();
  renderList();
}

//Run app
function events() {
  save_button.addEventListener("click", OnAddItem);
  del_some_btn.addEventListener("click", onDelSomeItems);
  select_items.addEventListener("change", (event) => {
    if (event.target.value === "All") {
      loadFromStorage();
    } else if (event.target.value === "ToDo") {
      loadFromStorage();
      const tempArray_todo = todoArray.filter((item) => {
        if (item.status === false) {
          return true;
        } else {
          return false;
        }
      });
      todoArray = tempArray_todo;
      console.log("todo");
    } else {
      loadFromStorage();
      const tempArray_todo = todoArray.filter((item) => {
        if (item.status === false) {
          return false;
        } else {
          return true;
        }
      });
      todoArray = tempArray_todo;
      console.log("done");
    }
    renderList();
    // renderList();
  });

  search_btn.addEventListener("click", () => {
    const searchArray = todoArray.filter((item) => {
      if (item.title.includes(search_txt.value)) {
        return true;
      } else {
        return false;
      }
    });
    console.log(searchArray);
    todoArray = searchArray;
    search_txt.value = "";
    renderList();
  });
}
function init() {
  loadFromStorage();
  renderList();
  events();
}

init();
