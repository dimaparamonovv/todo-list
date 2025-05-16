import { saveTasks, getTasks as loadTasks } from "./storage.js";
import { setTasks, getTasks, addTask } from "./tasks.js";
import { renderTasks, bindListEvents } from "./dom.js";

let currentFilter = "all";

setTasks(loadTasks());
renderTasks(currentFilter);
bindListEvents(() => currentFilter);

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const input = document.getElementById("input-todo");

  const value = input.value.trim();

  if (!value) return;

  addTask(value);
  saveTasks(getTasks());
  renderTasks(currentFilter);

  input.value = "";
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".filter-button")
      .forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    renderTasks(currentFilter);
  });
});
