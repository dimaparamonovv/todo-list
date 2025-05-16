let tasks = [];

export function setTasks(newTasks) {
  tasks = [...newTasks];
}

export function getTasks() {
  return tasks;
}

export function addTask(text) {
  tasks = [...tasks, { text, completed: false }];
}

export function deleteTask(index) {
  tasks = tasks.filter((_, i) => i !== index);
}

export function toggleTask(index) {
  tasks = tasks.map((task, i) =>
    i === index ? { ...task, completed: !task.completed } : task
  );
}

export function filterTasks(filter) {
  return tasks
    .map((task, index) => ({ task, index }))
    .filter(({ task }) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    });
}
