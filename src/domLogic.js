export { DomManager };
import { isArray, update } from 'lodash';


class DomManager {
    #projects;
    #selectedProject
    #columnOrder;

    constructor(projects) {
        this.#projects = projects
        this.#selectedProject = 'All';
        this.addEventListeners();
        this.#columnOrder = [[]];
    }

    renderProjectTable() {
        let self = this;

        let newRow, newCell, newText;
        let tableHead = document.getElementById('projectsTable').getElementsByTagName('thead')[0];
        let tableBody = document.getElementById('projectsTable').getElementsByTagName('tbody')[0];

        //Erase before refresh
        tableHead.innerHTML = ''
        tableBody.innerHTML = ''

        if (this.#projects.count() > 0) {
            //Create the header row
            newRow = document.createElement('tr');
            tableHead.appendChild(newRow);

            //Add 'All' project
            addProj('All');

            //Add projects
            this.#projects.getProjectNames().forEach(proj => {
                addProj(proj);
            })

            //Helper function to add a single project
            function addProj(p) {
                newRow = document.createElement('tr');
                tableBody.appendChild(newRow);
                newCell = document.createElement('td');
                newCell.addEventListener('click', function (e) {
                    self.#selectedProject = e.target.innerHTML;
                    self.renderTaskTable();
                });
                newText = document.createTextNode(p);
                newCell.appendChild(newText);
                newRow.appendChild(newCell);
            }
        }
    }

    addEventListeners() {
        let self = this;

        //If Add Task is clicked, open the modal
        document.getElementById('addTask').addEventListener('click', () => {
            //Set submit button text to 'Add Task'
            document.getElementById('submitButton').textContent = 'Add Task';

            //Set the form to 'Add' - this will be used later when it is submitted
            document.getElementById('addOrUpdate').value = 'Add';

            //Display the form
            document.getElementById('midContainer').className += 'blur';
            document.getElementById('overlay').style.display = 'block';
        });

        //If modal is open and user clicks outside form, close the form
        document.getElementById('overlay').addEventListener('click', (e) => {
            const f = document.getElementById('newTaskForm');
            if (!f.contains(e.target)) {
                this.resetForm();
            }
        });

        //When the form is submitted...
        document.getElementById('newTaskForm').addEventListener('submit', function (e) {
            e.preventDefault();
            if (document.getElementById('addOrUpdate').value == 'Update') {
                self.#projects.updateTask(this.title.value, this.description.value, this.project.value, this.dueDate.value, Number(this.priority.value), this.isComplete.value, this.recordID.value);
            } else {
                self.#projects.addTask(this.title.value, this.description.value, this.project.value, this.dueDate.value, this.priority.value, this.isComplete.value);
            }
            self.renderTaskTable();
            self.resetForm();
        });
    }

    renderTaskTable() {
        let newRow, newCell, newText;
        let tableHead = document.getElementById('tasksTable').getElementsByTagName('thead')[0];
        let tableBody = document.getElementById('tasksTable').getElementsByTagName('tbody')[0];
        let projectsInScope = this.#projects.getProjects(this.#selectedProject);
        let self = this;

        //Erase before refresh
        tableHead.innerHTML = ''
        tableBody.innerHTML = ''

        //Add header row
        let headings = ['Title', 'Description', 'Project Group', 'Due Date', 'Priority', 'Is Complete?', 'Edit', 'Delete', 'id'];
        newRow = document.createElement('tr');
        tableHead.appendChild(newRow);
        let x = 0;
        headings.forEach(h => {
            newCell = document.createElement('td');
            newText = document.createTextNode(h);
            newCell.appendChild(newText);
            newCell.dataset.id = x;
            newCell.addEventListener('click', self.sortTable)
            newRow.appendChild(newCell);
            if (h == 'id') {
                newCell.className = 'hidden';
            }
            x++;
        });

        //If its an array of projects, loop over them adding each one, else just add single project
        if (isArray(projectsInScope)) {
            projectsInScope.forEach(p => {
                refreshSingle(p)
            });
        } else {
            refreshSingle(projectsInScope);
        }

        //Helper function to add a single project
        function refreshSingle(p) {
            if (p.count() > 0) {
                //Add tasks
                p.getTasks().forEach(function callback(task, index) {
                    newRow = document.createElement('tr');
                    tableBody.appendChild(newRow);
                    Object.keys(task).forEach(key => {
                        newCell = document.createElement('td');
                        newText = document.createTextNode(task[key]);
                        newCell.appendChild(newText);
                        newRow.appendChild(newCell);
                    });

                    //Add the buttons
                    newRow.appendChild(getButton('Edit'));
                    newRow.appendChild(getButton('Delete'));

                    //Add index value
                    newCell = document.createElement('td');
                    newCell.className = 'hidden';
                    newText = document.createTextNode(task.project + '|' + index);
                    newCell.appendChild(newText);
                    newRow.appendChild(newCell);
                });
            }
        }

        //Helper function to add a button
        function getButton(buttonName) {
            newCell = document.createElement('td');
            newText = document.createElement('BUTTON');
            newText.addEventListener('click', tableButtonAction);
            newText.innerHTML = buttonName;
            newCell.appendChild(newText);
            return newCell;
        }

        //Function called when Edit or Delete is pressed
        function tableButtonAction(e) {
            if (e.target.innerHTML == 'Delete') deleteRecord(e.target.parentElement.parentElement);
            if (e.target.innerHTML == 'Edit') editRecord(e.target.parentElement.parentElement);
        }

        function editRecord(row) {
            //Update all the form values
            document.getElementById('submitButton').textContent = 'Update Task';
            document.getElementById('title').value = row.cells[0].firstChild.data;
            document.getElementById('description').value = row.cells[1].firstChild.data;
            document.getElementById('project').value = row.cells[2].firstChild.data;
            document.getElementById('dueDate').value = row.cells[3].firstChild.data;
            document.getElementById('priority').value = row.cells[4].firstChild.data;
            document.getElementById('isComplete').value = row.cells[5].firstChild.data;

            //Set the form to 'Update' - this will be used later when it is submitted
            document.getElementById('addOrUpdate').value = 'Update';

            //Set the ID
            document.getElementById('recordID').value = row.cells[8].firstChild.data;

            //Show the form
            document.getElementById('midContainer').className += 'blur';
            document.getElementById('overlay').style.display = 'block';
        }

        function deleteRecord(row) {
            self.#projects.deleteTask(row.cells[8].firstChild.data);
            self.renderTaskTable();
        }
    }

    setSelectedProject(projectName) {
        this.#selectedProject = projectName;
    }

    resetForm() {
        document.getElementById('newTaskForm').reset();
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('midContainer').classList.remove('blur');
    }

    sortTableOld(e) {
        let table = document.getElementById('tasksTable');
        let column = e.target.dataset.id
        let direction = 'asc';

        let contSwitching = true;
        let rows;
        let shouldSwitch;
        let row1, row2;
        let i, j;
        let x, y;

        while (contSwitching) {
            rows = table.rows;

            contSwitching = false;

            for (i = 1; i < (rows.length - 1); i++) {
                x = rows[i].getElementsByTagName("TD")[column].textContent;
                y = rows[i + 1].getElementsByTagName("TD")[column].textContent;
                if (direction == 'asc' ? (x > y) : (x < y)) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    contSwitching = true;
                }
            }
        }
    }

    sortTable(e) {
        // Helper functions
        const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

        const comparer = (idx, asc) => (a, b) => ((v1, v2) =>
            v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
        )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

        //Get the table and the table body
        const table = e.target.closest('table');
        const body = table.getElementsByTagName('tbody')[0];

        //Do the sorting
        Array.from(table.getElementsByTagName('tbody')[0].querySelectorAll('tr'))
            .sort(comparer(e.target.dataset.id, this.asc = !this.asc))
            .forEach(tr => body.append(tr));
    }
}

