//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners
loadEventListeners();

//Load all event listeners
function loadEventListeners() {
  //DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  //Remove task event
  taskList.addEventListener('click', removeTask);
  //Clear task events
  clearBtn.addEventListener('click', clearTasks);
  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

//Get tasks from Local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task) {
    //Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';

    //Create a text node and append it to the li
    li.appendChild(document.createTextNode(task));

    //Create a new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';

    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append the link to the li
    li.appendChild(link);

    //Append the li to the ul
    taskList.appendChild(li);
  })
}


//Add task
function addTask(event) {
  if (taskInput.value === '') {
    alert('Add a task please.');
  }

  //Create li element
  const li = document.createElement('li');
  li.className = 'collection-item';

  //Create a text node and append it to the li
  li.appendChild(document.createTextNode(taskInput.value));

  //Create a new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';

  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //Append the link to the li
  li.appendChild(link);

  //Append the li to the ul
  taskList.appendChild(li);

  //Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = '';

  event.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task
function removeTask(event) {
  if (event.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      event.target.parentElement.parentElement.remove();

      //Remove from the local storage
      removeTaskFromLocalStorage(event.target.parentElement.parentElement);
    }
  }
}

//Remove from local store
function removeTaskFromLocalStorage(taskItem) {
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear tasks
function clearTasks() {
  while (taskList.firstChild)
    taskList.removeChild(taskList.firstChild);

  //Clear from LS
  clearTasksFromLocalStorage();
}

//Clear tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter tasks
function filterTasks(event) {
  const text = event.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}