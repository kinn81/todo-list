import './styles.css';
import { ProjectList } from './projectList';
import { DomManager } from './domLogic';

//Container object to store, return, delete Project objects
let projects = new ProjectList();


//Add demo data and initialise app
projects.addTask('Breakfast', 'Cook weekend breakfast!', 'Meal Prep', '17 Aug 2022', 2, 'No');
projects.addTask('Gym', 'Go to the gym on Tuesday', 'Exercise', '16 Aug 2022', 2, 'No');
projects.addTask('Gym', 'Go to the gym on Wednesday', 'Exercise', '17 Aug 2022', 4, 'No');
projects.addTask('Gym', 'Go to the gym on Thursday', 'Exercise', '17 Aug 2022', 2, 'No');
projects.addTask('Dinner', 'Cook dinner on Thursday', 'Meal Prep', '17 Aug 2022', 2, 'No');
projects.addTask('Dinner', 'Cook dinner on Friday', 'Meal Prep', '18 Jan 2022', 2, 'No');

let domMgr = new DomManager(projects);
domMgr.renderTaskTable();
domMgr.renderProjectTable();

let taskt = document.getElementById('tasksTable');

let date1 = new Date('18 Jan 2022')





