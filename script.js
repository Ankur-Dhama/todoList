// Element Selections
const form = document.getElementById("todoform");
const todoinput = document.getElementById("new-todo");
const todosListEl = document.getElementById("todos-list");
let todo = [];
const todoEl = document.getElementsByClassName("todo");

//Event Listeners

form.addEventListener("submit", function (event) {
  event.preventDefault();
  savetodo();
  rendertodo();
});

//console.log(todoEl);
//todoEl.addEventListener("onClick", function (event) {
//event.preventDefault();
// console.log(event);
//});

// Handler Functions
function savetodo() {
  let isDuplicate = false;
  if (todo.length > 0) {
    todo.map((elem) => {
      if (elem.value.toLowerCase() === todoinput.value.toLowerCase()) {
        isDuplicate = true;
      }
    });
  }

  if (!todoinput.value) {
    alert("Please Enter a Valid Task");
  } else if (todoinput.value.trim() == "") {
    alert("Please Enter a Valid Task");
  } else if (isDuplicate) {
    alert("You have Entered a duplicate value");
  } else {
    todo.push({
      value: todoinput.value,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      checked: false,
    });
  }
}

function rendertodo() {
  todosListEl.innerHTML = "";

  todo.forEach((elem, index) => {
    todosListEl.innerHTML += `
    <div class="todo" id= ${index}>
        <i class= 'bi ${
          elem.checked ? "bi-check-circle-fill" : "bi-circle"
        }'></i>
        <p class=${elem.checked ? "checked" : ""}>${elem.value}</p>
        <i class="bi bi-pencil-square"></i>
        <i class="bi bi-trash3"></i>
      </div>
  `;
  });
}

todosListEl.addEventListener("click", function (elem) {
  const target = elem.target;
  const parentElem = target.parentNode;

  if (parentElem.className !== "todo") return;

  console.log(target.className, parentElem, parentElem.id);

  if (target.className == "bi bi-trash3") {
    todo.splice(parentElem.id, 1);
    //console.log(todo);
    rendertodo();
  }

  if (target.className == "bi bi-pencil-square") {
    let change = prompt(
      "Please Enter your changes",
      todo[`${parentElem.id}`].value
    );
    console.log(todo[`${parentElem.id}`].value);
    todo[`${parentElem.id}`].value = change;
    console.log(todo[`${parentElem.id}`].value);
    rendertodo();
  }
  if (target.className == "bi bi-circle") {
    todo[`${parentElem.id}`].checked = true;
    rendertodo();
  }
  if (target.className == "bi bi-check-circle-fill") {
    todo[`${parentElem.id}`].checked = false;
    rendertodo();
  }
});
