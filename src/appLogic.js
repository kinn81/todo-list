export { createToDo, ToDoContainer };

const createToDo = (title, desc, project = "default", dueDate, priority = 1, isComplete = false) => {
    let toDoActions = {
        isEqual(o) {
            if (JSON.stringify(this) === JSON.stringify(o)) {
                return true;
            } else {
                return false;
            }
        }
    }
    let toDo = Object.create(toDoActions);
    toDo.title = title;
    toDo.desc = desc;
    toDo.project = project;
    toDo.dueDate = dueDate;
    toDo.priority = priority;
    toDo.isComplete = isComplete;

    return toDo;
}

//Class that maintains the list of To Do's
class ToDoContainer {
    //Array to store all the To Do objects
    #toDos;

    constructor() {
        this.#toDos = [];
    }

    checkToDoExists(toDo) {
        let exists = false;
        this.#toDos.forEach(t => {
            if (toDo.isEqual(t)) {
                exists = true;
            }
        });
        return exists;
    }

    addToDo(toDo) {
        if (!this.checkToDoExists(toDo)) {
            this.#toDos.push(toDo);
        }
    }

    printToDos() {
        console.log(this.#toDos);
    }

    removeToDo(toDo) {
        let index = this.#toDos.indexOf()
        this.#toDos.forEach(function callback(t, idx) {
            if (toDo.isEqual(t)) index = idx;
        });
        if (index > -1) this.#toDos.splice(index, 1);
    }

    getToDos(proj = "All") {
        if (proj == "All") {
            return this.#toDos;
        } else {
            return this.#toDos.reduce((newArray, toDo) => {
                if (toDo.project == proj) {
                    newArray.push(toDo);
                }
                return newArray;
            }, []);
        }

    }

    getProjects() {
        let projects = [];
        this.#toDos.forEach(t => {
            if (projects.indexOf(t.project) == -1) projects.push(t.project);
        });
        return projects;
    }
}

class ProjectContainer {
    #projects;

    constructor() {
        this.#projects = [];
    }
}