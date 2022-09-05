export { ProjectList }

class ProjectList {
    #projects

    constructor() {
        this.#projects = [];
    }

    addProject(project) {
        if (!this.checkProjectExists(project)) {
            this.#projects.push(project);
        }
    }

    checkProjectExists(project) {
        for (let i = 0; i < this.#projects.length; i++) {
            return (this.#projects[i].getName() == project.getName() ? true : false)
        }
    }

    getProjects(projectName = 'All') {
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

    removeProject(project) {
    }
}