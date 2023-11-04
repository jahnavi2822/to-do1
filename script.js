document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    var taskInput = document.getElementById('taskInput');
    var taskText = taskInput.value.trim();
    if (taskText === '') return;

    var task = {
        text: taskText,
        completed: false,
        timestamp: new Date().toISOString()
    };

    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskInput.value = '';
    loadTasks();
}

function loadTasks() {
    var pendingTasksList = document.getElementById('pendingTasks');
    var completedTasksList = document.getElementById('completedTasks');
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        var listItem = document.createElement('li');
        listItem.textContent = task.text + ' (Added: ' + new Date(task.timestamp).toLocaleString() + ')';
        listItem.addEventListener('click', function() {
            task.completed = !task.completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            loadTasks();
        });

        if (task.completed) {
            listItem.classList.add('completed');
            completedTasksList.appendChild(listItem);
        } else {
            pendingTasksList.appendChild(listItem);
        }
    });
}
