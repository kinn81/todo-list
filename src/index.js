import { ProjectList } from './projectList';
import { Project } from './project';
import { createTask } from './task';
import './styles.css';

//Container object to store, return, delete Project objects
let projects = new ProjectList();

let t1 = createTask("Gym", "Go to the gym on Tuesday", "Exercise", "16 Aug 2022", 2, false);
let t2 = createTask("Gym", "Go to the gym on Wednesday", "Exercise", "17 Aug 2022", 2, false);
let t3 = createTask("Gym", "Go to the gym on Thursday", "Exercise", "17 Aug 2022", 2, false);
let exercise = new Project('Exercise');
exercise.addTask([t1, t2, t3]);
projects.addProject(exercise);

let t4 = createTask("Dinner", "Cook dinner on Thursday", "Meal prep", "17 Aug 2022", 2, false);
let t5 = createTask("Dinner", "Cook dinner on Friday", "Meal prep", "18 Aug 2022", 2, false);
let mealPrep = new Project('Meal Prep');
mealPrep.addTask(([t4, t5]));
projects.addProject(mealPrep);


function refreshProjects(projects) {
    let newRow, newCell, newText;
    let tableHead = document.getElementById('projects-table').getElementsByTagName('thead')[0];
    let tableBody = document.getElementById('projects-table').getElementsByTagName('tbody')[0];

    //Erase before refresh
    tableHead.innerHTML = ""
    tableBody.innerHTML = ""

    if (projects.count() > 0) {
        //Create the header row
        newRow = document.createElement("tr");
        tableHead.appendChild(newRow);

        //Add header
        newCell = document.createElement("td");
        newText = document.createTextNode('Project Group');
        newCell.appendChild(newText);
        newRow.appendChild(newCell);

        //Add projects
        projects.getProjectNames().forEach(proj => {
            newRow = document.createElement("tr");
            tableBody.appendChild(newRow);
            newCell = document.createElement("td");
            newCell.addEventListener('click', function (e) {
                refreshTasks(projects.getProjects(e.target.innerHTML));
            });
            newText = document.createTextNode(proj);
            newCell.appendChild(newText);
            newRow.appendChild(newCell);
        })
    }
}

function refreshTasks(singleProject, multiProjects) {
    let newRow, newCell, newText;
    let tableHead = document.getElementById('tasks-table').getElementsByTagName('thead')[0];
    let tableBody = document.getElementById('tasks-table').getElementsByTagName('tbody')[0];

    console.log(multiProjects);
    

    //Erase before refresh
    tableHead.innerHTML = ""
    tableBody.innerHTML = ""

    if (singleProject.count() > 0) {
        //Add header row
        let headings = ['Title', 'Description', 'Project Group', 'Due Date', 'Priority', 'Is Complete?'];
        newRow = document.createElement("tr");
        tableHead.appendChild(newRow);
        headings.forEach(h => {
            newCell = document.createElement("td");
            newText = document.createTextNode(h);
            newCell.appendChild(newText);
            newRow.appendChild(newCell);
        });

        //Add tasks
        singleProject.getTasks().forEach(task => {
            newRow = document.createElement("tr");
            tableBody.appendChild(newRow);
            Object.keys(task).forEach(key => {
                newCell = document.createElement("td");
                newText = document.createTextNode(task[key]);
                newCell.appendChild(newText);
                newRow.appendChild(newCell);
            });
        });
    }
}

refreshProjects(projects);
refreshTasks(projects.getProjects("Meal Prep"));
