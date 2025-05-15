const form = document.querySelector("form");
const input = document.getElementById("input-todo");
const list = document.getElementById("todo-list");
const filterButtons = document.querySelectorAll(".filter-button");

let allTasks = getTasks();
let currentFilter = "all";

updateList();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  addTask();
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    updateList();
  });
});

function addTask() {
  const taskText = input.value.trim();

  if (taskText.length > 0) {
    const taskObject = {
      text: taskText,
      completed: false,
    };

    allTasks.push(taskObject);

    saveTasks();
    updateList();

    input.value = "";
  }
}

function updateList() {
  list.innerHTML = "";

  let filteredTasks = allTasks;

  if (currentFilter === "active") {
    filteredTasks = allTasks.filter((task) => !task.completed);
  } else if (currentFilter === "completed") {
    filteredTasks = allTasks.filter((task) => task.completed);
  }

  filteredTasks.forEach((task) => {
    const taskIndex = allTasks.indexOf(task);

    const taskElement = createTask(task, taskIndex);

    list.append(taskElement);
  });
}

function createTask(task, taskIndex) {
  const taskId = `todo-${taskIndex}`;
  const taskItem = document.createElement("li");

  taskItem.classList.add("todo");

  taskItem.innerHTML = `
        <input type="checkbox" id="${taskId}" />
        <label class="custom-checkbox" for="${taskId}">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
          </svg>
        </label>
        <label for="${taskId}" class="todo-text">${task.text}</label>
        <button class="delete-button">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
          </svg>
        </button>
  `;

  const deleteButton = taskItem.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTask(taskIndex);
  });

  const checkbox = taskItem.querySelector("input");
  checkbox.checked = task.completed;

  checkbox.addEventListener("change", () => {
    allTasks[taskIndex].completed = checkbox.checked;

    saveTasks();
    updateList();
  });

  return taskItem;
}

function deleteTask(taskIndex) {
  allTasks = allTasks.filter((_, i) => i !== taskIndex);

  saveTasks();
  updateList();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks") || "[]");
}
