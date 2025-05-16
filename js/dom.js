import { deleteTask, toggleTask, filterTasks, getTasks } from "./tasks.js";
import { saveTasks } from "./storage.js";

export function renderTasks(currentFilter) {
  const list = document.getElementById("todo-list");
  list.innerHTML = "";

  const filtered = filterTasks(currentFilter);

  filtered.forEach(({ task, index }) => {
    const item = createTaskElement(task, index);
    list.appendChild(item);
  });
}

function createTaskElement(task, index) {
  const item = document.createElement("li");
  item.classList.add("todo");
  item.dataset.index = index;

  item.innerHTML = `
    <input type="checkbox" id="todo-${index}" ${
    task.completed ? "checked" : ""
  } />
    <label class="custom-checkbox" for="todo-${index}">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
      </svg>
    </label>
    <label for="todo-${index}" class="todo-text">${task.text}</label>
    <button class="delete-button" aria-label="Delete task">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="var(--secondary-color)">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
      </svg>
    </button>
  `;

  return item;
}

export function bindListEvents(getCurrentFilter) {
  const list = document.getElementById("todo-list");

  list.addEventListener("click", (e) => {
    const li = e.target.closest("li");

    if (!li) return;

    const index = +li.dataset.index;

    if (e.target.matches("input[type='checkbox']")) {
      toggleTask(index);
      saveTasks(getTasks());
      renderTasks(getCurrentFilter());
    }

    if (e.target.closest(".delete-button")) {
      deleteTask(index);
      saveTasks(getTasks());
      renderTasks(getCurrentFilter());
    }
  });
}
