export default class Task {
    constructor(id, userId, chapter, title, description, complete, dueDate, priority) {
        this.id = id;
        this.userId = userId;
        this.chapter = chapter;
        this.title = title;
        this.description = description;
        this.complete = complete;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}