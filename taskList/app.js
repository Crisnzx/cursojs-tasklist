const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');

const filter = document.querySelector('#filter');

const taskList = document.querySelector('.collection');
const clearButton = document.querySelector('.clear-tasks');


loadEventListeners();

function loadEventListeners() {

    document.addEventListener('DOMContentLoaded', loadTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearButton.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}


// Main methods

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    } else {

        // User Interface
        createLiElement(taskInput.value);

        // LocalStorage
        storeTaskLocalStorage(taskInput.value);

        taskInput.value = '';
    }
    e.preventDefault();
}


function removeTask(e) {

    // User Interface
    if(e.target.parentElement.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
    }

     // Local Storage
    
    let tasks = getArray();
    
    tasks.forEach(function(task, index) {
        if(e.target.parentElement.parentElement.firstChild.textContent == task) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    // console.log(e.target);
    e.preventDefault();
}

function clearTasks(e) {

    // User Interface

    //slower
    // taskList.innerHTML = '';
    
    //faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    
    // Local Storage

    localStorage.clear();
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

// Local Storage

function loadTasks() {

    let tasks = getArray();

    tasks.forEach(function(taskName) {

        createLiElement(taskName);
    });

}

function storeTaskLocalStorage(task) {
    let tasks = getArray();

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Utility

function getArray() {

    return JSON.parse(localStorage.getItem('tasks')) || [];
    
}

function createLiElement(taskName) {

        const li = document.createElement('li');
        li.className = 'collection-item';
        
        const p = document.createElement('p');
        p.innerText = taskName;

        const link = document.createElement('a');
        link.className = 'delete-item';
        link.href = '#';

        const icon = document.createElement('i');
        icon.className = 'fa fa-remove';

        link.appendChild(icon);
        li.appendChild(p);
        li.appendChild(link);
        taskList.appendChild(li);
}

