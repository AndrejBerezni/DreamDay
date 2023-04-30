async function loadAllTasks(container, getTasksForCurrentUser, generateTaskElement) {
    container.innerHtml = ''
    const tasks = await getTasksForCurrentUser();
    for (let i = 0; i < tasks.length; i ++) {
        generateTaskElement(tasks[i], container)
    }
}

async function loadTodaysTasks(container, getTodaysTasksForCurrentUser, generateTaskElement) {
    container.innerHtml = ''
    const tasks = await getTodaysTasksForCurrentUser();
    for (let i = 0; i < tasks.length; i ++) {
        generateTaskElement(tasks[i], container)
    }
}

export {loadAllTasks, loadTodaysTasks}