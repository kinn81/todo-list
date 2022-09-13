import { ProjectList } from './projectList';
import { Project } from './project';
import { createTask } from './task';
import './styles.css';
import { isArray, update } from 'lodash';

//Variable used to keep track of last project selected by user
let selectedProject = 'All';

//Container object to store, return, delete Project objects
let projects = new ProjectList();

function displayProjects(projects) {
    let newRow, newCell, newText;
    let tableHead = document.getElementById('projectsTable').getElementsByTagName('thead')[0];
    let tableBody = document.getElementById('projectsTable').getElementsByTagName('tbody')[0];

    //Erase before refresh
    tableHead.innerHTML = ""
    tableBody.innerHTML = ""

    if (projects.count() > 0) {
        //Create the header row
        newRow = document.createElement("tr");
        tableHead.appendChild(newRow);

        /*
        //Add header
        newCell = document.createElement("td");
        newText = document.createTextNode('Project Group');
        newCell.appendChild(newText);
        newRow.appendChild(newCell);
        */
        //Add 'All' project
        addProj('All');

        //Add projects
        projects.getProjectNames().forEach(proj => {
            addProj(proj);
        })

        //Helper function to add a single project
        function addProj(p) {
            newRow = document.createElement("tr");
            tableBody.appendChild(newRow);
            newCell = document.createElement("td");
            newCell.addEventListener('click', function (e) {
                this.selectedProject = e.target.innerHTML;
                displayTasks(projects.getProjects(this.selectedProject));
            });
            newText = document.createTextNode(p);
            newCell.appendChild(newText);
            newRow.appendChild(newCell);
        }
    }
}

function displayTasks(project) {
    let newRow, newCell, newText;
    let tableHead = document.getElementById('tasksTable').getElementsByTagName('thead')[0];
    let tableBody = document.getElementById('tasksTable').getElementsByTagName('tbody')[0];

    //Erase before refresh
    tableHead.innerHTML = ""
    tableBody.innerHTML = ""

    //Add header row
    let headings = ['Title', 'Description', 'Project Group', 'Due Date', 'Priority', 'Is Complete?', 'Edit', 'Delete'];
    newRow = document.createElement("tr");
    tableHead.appendChild(newRow);
    headings.forEach(h => {
        newCell = document.createElement("td");
        newText = document.createTextNode(h);
        newCell.appendChild(newText);
        newRow.appendChild(newCell);
    });

    //If its an array of projects, loop over them adding each one, else just add single project
    if (isArray(project)) {
        project.forEach(p => {
            refreshSingle(p)
        });
    } else {
        refreshSingle(project);
    }

    //Helper function to add a single project
    function refreshSingle(p) {
        if (p.count() > 0) {
            //Add tasks
            p.getTasks().forEach(task => {
                newRow = document.createElement("tr");
                tableBody.appendChild(newRow);
                Object.keys(task).forEach(key => {
                    newCell = document.createElement("td");
                    newText = document.createTextNode(task[key]);
                    newCell.appendChild(newText);
                    newRow.appendChild(newCell);
                });
                newRow.appendChild(getTableButton('Edit'));
                newRow.appendChild(getTableButton('Delete'));
            });
        }
    }

    //Helper function to add a button
    function getTableButton(buttonName) {
        newCell = document.createElement("td");
        newText = document.createElement("BUTTON");
        newText.addEventListener('click', tableButtonAction);
        newText.innerHTML = buttonName;
        newCell.appendChild(newText);
        return newCell;
    }
}

//Function called when Edit or Delete is pressed
function tableButtonAction(e) {
    if (e.target.innerHTML == 'Delete') deleteRecord(e.target.parentElement.parentElement);
}

//Function called when a user tries to delete a task record
function deleteRecord(row) {
    const tempTask = createTask(
        row.cells[0].firstChild.data,
        row.cells[1].firstChild.data,
        row.cells[2].firstChild.data,
        row.cells[3].firstChild.data,
        row.cells[4].firstChild.data,
        row.cells[5].firstChild.data
    )
    projects.deleteTask(tempTask);
    updateTables();
}

//Called when the Add Task form is submitted
function addTask(e) {
    projects.addTask(e.title.value, e.description.value, e.project.value, e.dueDate.value, e.priority.value, e.isComplete.value);
    displayProjects(projects);
    displayTasks(projects.getProjects(selectedProject));
}

function updateTables() {
    displayProjects(projects);
    displayTasks(projects.getProjects(selectedProject));

}

//Add demo data and initialise app
projects.addTask("Breakfast", "Cook weekend breakfast!", "Meal Prep", "17 Aug 2022", 2, 'No');
projects.addTask("Gym", "Go to the gym on Tuesday", "Exercise", "16 Aug 2022", 2, 'No');
projects.addTask("Gym", "Go to the gym on Wednesday", "Exercise", "17 Aug 2022", 2, 'No');
projects.addTask("Gym", "Go to the gym on Thursday", "Exercise", "17 Aug 2022", 2, 'No');
projects.addTask("Dinner", "Cook dinner on Thursday", "Meal Prep", "17 Aug 2022", 2, 'No');
projects.addTask("Dinner", "Cook dinner on Friday", "Meal Prep", "18 Aug 2022", 2, 'No');
window.addTask = addTask;
updateTables();
