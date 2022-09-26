import { ProjectList } from './projectList';
//import { Project } from './project';
//import { createTask } from './task';
import './styles.css';
import { DomManager } from './domLogic';

//Container object to store, return, delete Project objects
let projects = new ProjectList();

function sortTable(table, column, direction = 'asc') {
    let contSwitching = true;
    let rows;
    let shouldSwitch;
    let row1, row2;
    let i, j;
    let x, y;

    while (contSwitching) {
        rows = table.rows;
        
        if(direction == 'asc') {
            i = 1;
            j = rows.length - 1
        } else if(direction == 'asc') {
            i = rows.length - 1
            j = rows.length - 1
        }

        contSwitching =  false;

        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[column].textContent;
            y = rows[i + 1].getElementsByTagName("TD")[column].textContent;
            if (direction == 'asc' ? (x > y) : (x < y)) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                contSwitching = true;
            }
        }
    }
}

//Add demo data and initialise app
projects.addTask('Breakfast', 'Cook weekend breakfast!', 'Meal Prep', '17 Aug 2022', 2, 'No');
projects.addTask('Gym', 'Go to the gym on Tuesday', 'Exercise', '16 Aug 2022', 2, 'No');
projects.addTask('Gym', 'Go to the gym on Wednesday', 'Exercise', '17 Aug 2022', 4, 'No');
projects.addTask('Gym', 'Go to the gym on Thursday', 'Exercise', '17 Aug 2022', 2, 'No');
projects.addTask('Dinner', 'Cook dinner on Thursday', 'Meal Prep', '17 Aug 2022', 2, 'No');
projects.addTask('Dinner', 'Cook dinner on Friday', 'Meal Prep', '18 Aug 2022', 2, 'No');

let domMgr = new DomManager(projects);
domMgr.renderTaskTable();
domMgr.renderProjectTable();

let taskt = document.getElementById('tasksTable');
//console.log(taskt);
sortTable(taskt, 3, 'desc');


