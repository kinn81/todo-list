export { createTask };


//This represents an individual TASK, which will be contained in a PROJECT LIST
const createTask = (title, desc, project = "default", dueDate, priority = 1, isComplete = false) => {
    let taskActions = {
        isEqual(o) {
            if (JSON.stringify(this) === JSON.stringify(o)) {
                return true;
            } else {
                return false;
            }
        }
    }
    let task = Object.create(taskActions);
    task.title = title;
    task.desc = desc;
    task.project = project;
    task.dueDate = dueDate;
    task.priority = priority;
    task.isComplete = isComplete;

    return task;
}




