export { ProjectList, storageAvailable};
import { create } from "lodash";
import { createTask } from "./task";
import { Project } from "./project";

class ProjectList {
    #projects;

    constructor() {
        this.#projects = [];
    }

    addProject(project) {
        if (!this.checkProjectExists(project)) {
            this.#projects.push(project);
        }
    }

    checkProjectExists(project) {
        if (typeof project == "string") {
            for (let i = 0; i < this.#projects.length; i++) {
                if (this.#projects[i].getName() == project) {
                    return true;
                }
            }
        } else {
            for (let i = 0; i < this.#projects.length; i++) {
                if (this.#projects[i].getName() == project.getName()) {
                    return true;
                }
            }
        }
        return false;
    }

    getProjects(projectName) {
        if (projectName == 'All') {
            return this.#projects;
        } else {
            for (let i = 0; i < this.#projects.length; i++) {
                if (this.#projects[i].getName() == projectName) return this.#projects[i];
            }
        }
    }

    getProjectNames() {
        let names = [];
        for (let i = 0; i < this.#projects.length; i++) {
            names.push(this.#projects[i].getName());
        }
        return names;
    }

    count() {
        return this.#projects.length;
    }

    deleteProject(project) {
    }

    deleteTask(recordID) {
        recordID = recordID.split("|");
        this.getProjects(recordID[0]).removeTask(Number(recordID[1]));
    }

    addTask(title, desc, project = "Default", dueDate, priority = 1, isComplete = false) {
        let newTask = createTask(title, desc, project, dueDate, priority, isComplete);
        let key = title + '|' + desc + '|' + project + '|' +dueDate + '|' + priority + '|' + isComplete;
        if (this.checkProjectExists(project)) {
            let p = this.getProjects(project);
            p.addTask(newTask);
            if (storageAvailable('localStorage')) localStorage.setItem(key, JSON.stringify(newTask));
        } else {
            let newProject = new Project(project);
            newProject.addTask(newTask);
            this.addProject(newProject);
            if (storageAvailable('localStorage'))localStorage.setItem(key, JSON.stringify(newTask));

        }
    }

    updateTask(title, desc, project, dueDate, priority, isComplete, recordID) {
        recordID = recordID.split("|");
        let task = this.getProjects(recordID[0]).getTasks(Number(recordID[1]));

        task.title = title;
        task.desc = desc;
        task.dueDate = dueDate;
        task.priority = priority;
        task.isComplete = isComplete;
    }
}


function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}
