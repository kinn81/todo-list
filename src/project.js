export { Project };


/*
This is a Project object which will contain a list of Task objects
For example: workoutFriday is an individual Task, which is contained in the Workout project (along with other Workout type Tasks)
*/
class Project {
    //Array to store all the Task objects
    #tasks;
    #projName;

    constructor(projName) {
        this.#tasks = [];
        this.#projName = projName;
    }

    isEqual(project) {
        if (this.#projName == project.getName()) {
            return true;
        } else {
            return false;
        }
    }

    checkTaskExists(task) {
        let exists = false;
        //Dont need to iterate everything. Need to replacce For Each with regular loop
        this.#tasks.forEach(t => {
            if (task.isEqual(t)) {
                exists = true;
            }
        });
        return exists;
    }

    addTask(task) {
        if (Array.isArray(task)) {
            task.forEach(t => {
                if (!this.checkTaskExists(t)) {
                    this.#tasks.push(t);
                }
            });
        } else {
            if (!this.checkTaskExists(task)) {
                this.#tasks.push(task);
            }
        }
    }

    printTask() {
        console.log(this.#tasks);
    }

    removeTask(task) {      
        for (let i = 0; i < this.#tasks.length; i++) {
            if(this.#tasks[i].isEqual(task)) {
                this.#tasks.splice(i, 1);                
            }
        }
    }

    getTasks(index = "") {
        if (index == "") {
            return this.#tasks;
        } else {
            return  this.#tasks[index];
        }
    }

    getName() {
        return this.#projName;
    }

    count() {
        return this.#tasks.length;
    }
}
