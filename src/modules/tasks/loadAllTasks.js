async function loadAllTasks(
  container,
  getTasksForCurrentUser,
  generateTaskElement
) {
  const tasks = await getTasksForCurrentUser();
  for (let i = 0; i < tasks.length; i++) {
    generateTaskElement(tasks[i], container);
  }
}

async function loadTodaysTasks(
  container,
  getTodaysTasksForCurrentUser,
  generateTaskElement
) {
  const tasks = await getTodaysTasksForCurrentUser();
  for (let i = 0; i < tasks.length; i++) {
    generateTaskElement(tasks[i], container);
  }
}

async function loadThisWeeksTasks(
  container,
  getThisWeeksTasksForCurrentUser,
  generateTaskElement
) {
  const tasks = await getThisWeeksTasksForCurrentUser();
  for (let i = 0; i < tasks.length; i++) {
    generateTaskElement(tasks[i], container);
  }
}

export { loadAllTasks, loadTodaysTasks, loadThisWeeksTasks };
