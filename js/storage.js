const STORAGE_KEY = "tasks";

export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function getTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);

    const parsed = JSON.parse(data);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
