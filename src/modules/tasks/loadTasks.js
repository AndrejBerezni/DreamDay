async function loadTasks(
  container,
  getTasks,
  generateTaskElement
) {
  const tasks = await getTasks();
  for (let i = 0; i < tasks.length; i++) {
    generateTaskElement(tasks[i], container);
  }
}
async function loadChapterTasks(
  container,
  getTasks,
  chapter,
  generateTaskElement
) {
  const tasks = await getTasks(chapter);
  for (let i = 0; i < tasks.length; i++) {
    generateTaskElement(tasks[i], container);
  }
}

export {loadTasks, loadChapterTasks}

// Merge these two functions into one
