document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    
    if (taskText === "") return;

    let taskList = document.getElementById("taskList");

    let li = document.createElement("li");
    li.textContent = taskText;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = function () {
        deleteTask(this);
    };

    li.appendChild(deleteBtn);
    li.addEventListener("click", toggleComplete);

    taskList.appendChild(li);
    saveTasks();

    taskInput.value = "";
}

function deleteTask(button) {
    let li = button.parentElement;
    li.remove();
    saveTasks();
}

function toggleComplete(event) {
    // Prevents toggling when clicking the "X" button
    if (event.target.tagName === "BUTTON") return;
    
    this.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let text = li.childNodes[0].nodeValue.trim(); // Get text without "X"
        let completed = li.classList.contains("completed");
        tasks.push({ text, completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");

    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) li.classList.add("completed");

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("delete-btn");
        deleteBtn.onclick = function () {
            deleteTask(this);
        };

        li.appendChild(deleteBtn);
        li.addEventListener("click", toggleComplete);
        
        taskList.appendChild(li);
    });
}