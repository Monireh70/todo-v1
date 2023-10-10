const txt_input = document.querySelector("#todo-txt");
const save_button = document.querySelector("#save-btn");
const list = document.querySelector(".list");
//typeof list = object

const todoArray = [];
const previousList = JSON.parse(localStorage.getItem("myList"));
for (let i = 0; i < previousList.length; i++) {
  title = previousList[i];
  makeItem(title);
}

function makeItem(value) {
  //create <div class="item">
  const item = document.createElement("div");
  item.classList.add("item");

  //create <input type="checkbox">
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");

  //create <span> item1 </span>
  const span = document.createElement("span");
  span.textContent = value;

  item.appendChild(checkbox);
  item.appendChild(span);

  list.appendChild(item);
}

function clearTextBox() {
  txt_input.value = "";
}
function syncStorage(value) {
  todoArray.push(value);
  const newList = JSON.stringify(todoArray);
  localStorage.setItem("myList", newList);
}
save_button.addEventListener("click", () => {
  const val = txt_input.value;
  if (val === "") {
    alert("Please Fill the Text Area");
  } else {
    syncStorage(val);
    makeItem(val);
    clearTextBox();

    //convert a java array to json string :JSON.stringify(arrya) Opp of JSON.pase(string)
    // const myCollection = JSON.stringify(todoArray);

    // console.log( typeof todoArray);    ...>object=Array
    // console.log(typeof myCollection);  ....>string
  }
});
