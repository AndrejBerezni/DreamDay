export default class Chapter {
    constructor(id, userId, name, tasks, completed, dueDate) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.tasks = tasks;
        this.completed = completed;
        this.dueDate = dueDate;
    }
}