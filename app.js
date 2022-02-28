// Selectors

// Selecting the classes from the HTML and assigning them a const var
const todoInput = document.querySelector(".todoInput");
const todoButton = document.querySelector(".todoButton");
const todoList = document.querySelector(".todoList");
const filterOption = document.querySelector(".filterTodo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
// listen for a click and add todo
todoButton.addEventListener("click", addTodo);
// listen for a click and delete todo
todoList.addEventListener("click", deleteTodo);
// listen for filter options in select element
filterOption.addEventListener("change", filterTodo); // "change" event listener only works on Chrome
// "click" event listener works on moz for select tag

// Functions

function addTodo(event) {
    // Prevent form from submitting
    event.preventDefault();
    // Create Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    newTodo.classList.add("todoItem");
    todoDiv.appendChild(newTodo);
    // Clear Todo input value
    todoInput.value = "";
    // Create Check Mark Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add("completeButton");
    todoDiv.appendChild(completedButton);
    // Create Trash/Remove Button
    const removeButton = document.createElement("button");
    removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    removeButton.classList.add("trashButton");
    todoDiv.appendChild(removeButton);
    // Append to Ul
    todoList.appendChild(todoDiv);
}

function deleteTodo(event){
    const item = event.target;
    // Delete the todo
    if(item.classList[0] === "trashButton"){
        const todo = item.parentElement;
        // Transition
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

    // Complete the todo
    if(item.classList[0] === "completeButton"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
      switch (event.target.value) {
        case "all":
          todo.style.display = "flex";
          break;
        case "completed":
          if (todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
          break;
        case "incomplete":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
      }
    });
}

// Setting up local storage to save todo list
function saveLocalTodos(todo) {
  // Check if things are already locally saved in todos
  let todos;
  if(localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Removing items from local storage
function removeLocalTodos(todo) {
  // Check if things are already locally saved in todos
  let todos;
  if(localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // Get index of element
  const todoIndex = todo.children[0].innerText;
  // Splice the index of element
  todos.splice(todos.indexOf(todoIndex), 1);
  // update new list with deleted item
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
  // Check if things are already locally saved in todos
  let todos;
  if(localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function(todo){
      // Create Todo Div
      let todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      // Create Li
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todoItem");
      todoDiv.appendChild(newTodo);
      // Clear Todo input value
      todoInput.value = "";
      // Create Check Mark Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
      completedButton.classList.add("completeButton");
      todoDiv.appendChild(completedButton);
      // Create Trash/Remove Button
      const removeButton = document.createElement("button");
      removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
      removeButton.classList.add("trashButton");
      todoDiv.appendChild(removeButton);
      // Append to Ul
      todoList.appendChild(todoDiv);
  });
}

