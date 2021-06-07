const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');

const filter = document.querySelector('#filter');

const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');


loadEventListeners();

function loadEventListeners() {

    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearButton.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}


function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    } else {

        const li = document.createElement('li');
        li.className = 'collection-item';
        
        const p = document.createElement('p');
        p.innerText = taskInput.value;

        const link = document.createElement('a');
        link.className = 'delete-item';
        link.href = '#';

        const icon = document.createElement('i');
        icon.className = 'fa fa-remove';

        link.appendChild(icon);
        li.appendChild(p);
        li.appendChild(link);
        taskList.appendChild(li);
        taskInput.value = '';
    }
    e.preventDefault();
}

function removeTask(e) {

    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove()
    }
    // console.log(e.target);
    e.preventDefault();
}

function clearTasks(e) {
    //slower
    // taskList.innerHTML = '';
    
    //faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    
}

function filterTasks(e) {
    
    const text = e.target.value.toLowerCase();
    
    Array.from(document.getElementsByClassName('collection-item')).forEach(function(task) {
        const item = task.firstChild.textContent.toLowerCase();

        if(item.indexOf(text) != -1) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
    
}