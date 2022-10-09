import './styles.css';
import { ProjectList, storageAvailable } from './projectList';
import { DomManager } from './domLogic';

//Container object to store, return, delete Project objects
let projects = new ProjectList();
//projects.addTask('Dinner', 'Cook dinner on Friday', 'Meal Prep', '18 Jan 2022', 2, 'No');

//Retrieve from localStorage
for (let i = 0; i < localStorage.length; i++) {
    let record = JSON.parse(localStorage.getItem(localStorage.key(i)));
    projects.addTask(record.title, record.desc, record.project, record.dueDate, record.priority, record.isComplete);
}

let domMgr = new DomManager(projects);
domMgr.renderTaskTable();
domMgr.renderProjectTable();

