let todoList = document.getElementById("todo-list");
let inprogressList = document.getElementById("inprogress-list");
let doneList = document.getElementById("done-list");

// Load tasks from local storage
loadTasks();

function loadTasks() {
  let todoTasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
  let inprogressTasks =
    JSON.parse(localStorage.getItem("inprogressTasks")) || [];
  let doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

  // Add tasks to the Kanban board
  for (let task of todoTasks) {
    addTask("todo", task);
  }
  for (let task of inprogressTasks) {
    addTask("inprogress", task);
  }
  for (let task of doneTasks) {
    addTask("done", task);
  }
}

function saveTasks() {
  let todoTasks = [];
  let inprogressTasks = [];
  let doneTasks = [];

  // Collect tasks from each column and save to local storage
  for (let li of todoList.children) {
    let task = li.firstChild.nodeValue;
    todoTasks.push(task);
  }
  for (let li of inprogressList.children) {
    let task = li.firstChild.nodeValue;
    inprogressTasks.push(task);
  }
  for (let li of doneList.children) {
    let task = li.firstChild.nodeValue;
    doneTasks.push(task);
  }

  localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
  localStorage.setItem("inprogressTasks", JSON.stringify(inprogressTasks));
  localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
}

function addTask(column, task = "") {
  if (task == "") {
    task = "New Task";
  }
  if (task != null && task != "") {
    let li = document.createElement("li");
    li.draggable = true;
    li.classList.add('item')
    li.innerHTML =
      task +
      '<div><button class="edit" onclick="editTask(this)"><i class="fa-solid fa-pencil"></i></button><button class="delete" onclick="deleteTask(this)"><i class="fa-solid fa-trash"></i></button></div>';
    switch (column) {
      case "todo":
        todoList.appendChild(li);
        break;
      case "inprogress":
        inprogressList.appendChild(li);
        break;
      case "done":
        doneList.appendChild(li);
        break;
      default:
        break;
    }
    saveTasks();
   dragItem();
    // addDragDropListeners(li);
  }
}

function editTask(button) {
  let li = button.parentNode.parentNode;
  let task = li.firstChild.nodeValue;
  console.log(task);
   const inputElement = document.createElement("input");
   task = inputElement.textContent;
  task = prompt('Add New Task',)
  let newTask = task;
  if (newTask != null && newTask != "") {
    li.firstChild.nodeValue = newTask;
    saveTasks();
  }
}

function deleteTask(button) {
  let li = button.parentNode.parentNode;
  li.parentNode.removeChild(li);
  saveTasks();
}




function dragItem() {
  const list_items = document.querySelectorAll(".item");
  const lists = document.querySelectorAll(".uls");
  const main = document.querySelector('.column')
  let draggedItem = null;

  for (let i = 0; i < list_items.length; i++) {
    const item = list_items[i];

    item.addEventListener("dragstart", function () {
      draggedItem = item;
      item.parentElement.style.padding = "30px";
      setTimeout(function () {
        item.style.display = "none";
      }, 0);
    });

    item.addEventListener("dragend", function () {
      setTimeout(function () {
        // draggedItem.style.display = "block";
        draggedItem = null;
      }, 0);
    });

    for (let j = 0; j < lists.length; j++) {
      const list = lists[j];

      list.addEventListener("dragover", function (e) {
        e.preventDefault();
        item.parentElement.style.padding = "30px";
      });

      list.addEventListener("dragenter", function (e) {
        e.preventDefault();
        this.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
      });

      list.addEventListener("dragleave", function (e) {
        this.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
      });

      list.addEventListener("drop", function (e) {
        this.append(draggedItem);
        this.style.backgroundColor = "rgba(0, 0, 0, 0.1)";
        saveTasks();
        set();
        // setInterval(set, 100);
      });
    }
  }
}
function set(){
  location.reload()
}





// function addDragDropListeners(li) {
//   li.addEventListener("dragstart", function (event) {
//     event.dataTransfer.setData("text/plain", li.innerHTML);
//     event.dataTransfer.effectAllowed = "move";
//   });

//   li.addEventListener("dragover", function (event) {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   });

//   li.addEventListener("drop", function (event) {
//     event.preventDefault();
//     let sourceLi = document.createElement("li");
//     sourceLi.innerHTML = event.dataTransfer.getData("text/plain");
//     li.parentNode.insertBefore(sourceLi, li);
//     li.parentNode.removeChild(li);
//     saveTasks();
//   });
// }
