// script.js

const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const todoList = document.getElementById('todoList');

/**
 * Sets the minimum date for the due date input to today's date,
 * preventing users from selecting past dates.
 */
function setMinDueDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dueDateInput.min = `${year}-${month}-${day}`;
}

/**
 * Loads tasks from local storage and adds them to the DOM.
 * Handles older task formats by converting them to objects.
 */
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        // Ensure task is an object with 'text', 'dueDate', and 'completed' properties
        if (typeof task === 'string') {
            // Convert old string format to new object format
            addTaskToDOM({ text: task, dueDate: '', completed: false });
        } else {
            addTaskToDOM(task);
        }
    });
}

/**
 * Saves all current tasks from the DOM to local storage.
 * Each task is saved as an object containing its text, due date, and completion status.
 */
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        const taskText = item.querySelector('.task-text').textContent;
        const dueDateSpan = item.querySelector('.due-date');
        // Retrieve the raw date from the data attribute
        const dueDate = dueDateSpan && dueDateSpan.dataset.rawDate ? dueDateSpan.dataset.rawDate : '';
        const isCompleted = item.classList.contains('completed');
        tasks.push({ text: taskText, dueDate: dueDate, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 * Adds a new task item to the DOM based on the provided task object.
 * Includes functionality for marking as complete, editing, and deleting.
 * @param {object} taskObj - An object containing task details: { text: string, dueDate: string, completed: boolean }
 */
function addTaskToDOM(taskObj) {
    const listItem = document.createElement('li');
    listItem.classList.add('todo-item');
    if (taskObj.completed) {
        listItem.classList.add('completed');
    }

    const taskDetails = document.createElement('div');
    taskDetails.classList.add('task-details');
    listItem.appendChild(taskDetails);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = taskObj.completed;
    checkbox.addEventListener('change', function() {
        listItem.classList.toggle('completed', checkbox.checked);
        saveTasks(); // Save state change to local storage
    });
    taskDetails.appendChild(checkbox);

    const taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskDetails.appendChild(taskContent);

    const taskSpan = document.createElement('span');
    taskSpan.classList.add('task-text');
    taskSpan.textContent = taskObj.text;
    taskSpan.contentEditable = 'false'; // Initially not editable
    taskContent.appendChild(taskSpan);

    const dueDateSpan = document.createElement('span');
    dueDateSpan.classList.add('due-date');
    // Store the raw date in a data attribute for easier retrieval during saving
    dueDateSpan.dataset.rawDate = taskObj.dueDate;

    if (taskObj.dueDate) {
        // Format the date for display
        const date = new Date(taskObj.dueDate);
        dueDateSpan.textContent = `Due: ${date.toLocaleDateString()}`;
    } else {
        dueDateSpan.textContent = 'No due date'; // Display if no date is set
    }
    taskContent.appendChild(dueDateSpan);

    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('actions');
    listItem.appendChild(actionsDiv);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', function() {
        if (taskSpan.contentEditable === 'true') {
            // If currently editing, save changes
            taskSpan.contentEditable = 'false';
            taskSpan.classList.remove('editing');
            editButton.textContent = 'Edit';
            saveTasks(); // Save edited text to local storage
        } else {
            // Start editing
            taskSpan.contentEditable = 'true';
            taskSpan.classList.add('editing');
            taskSpan.focus();
            editButton.textContent = 'Save';
            // Select all text when entering edit mode for easy replacement
            const range = document.createRange();
            range.selectNodeContents(taskSpan);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    });

    // Save on Enter key press while editing
    taskSpan.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent new line when Enter is pressed
            taskSpan.contentEditable = 'false';
            taskSpan.classList.remove('editing');
            editButton.textContent = 'Edit';
            saveTasks();
        }
    });

    // Save on blur (clicking outside) while editing
    taskSpan.addEventListener('blur', function() {
        if (taskSpan.contentEditable === 'true') {
            taskSpan.contentEditable = 'false';
            taskSpan.classList.remove('editing');
            editButton.textContent = 'Edit';
            saveTasks();
        }
    });

    actionsDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', function() {
        // Using a custom confirmation dialog instead of alert() or confirm()
        showConfirmationDialog('Are you sure you want to delete this task?', () => {
            listItem.remove();
            saveTasks(); // Update local storage after deletion
        });
    });
    actionsDiv.appendChild(deleteButton);

    todoList.appendChild(listItem);
}

/**
 * Displays a custom confirmation/alert dialog.
 * @param {string} message - The message to display in the dialog.
 * @param {function} onConfirm - Callback function to execute when 'OK' is clicked.
 * @param {boolean} [showCancel=true] - Whether to show a 'Cancel' button.
 */
function showConfirmationDialog(message, onConfirm, showCancel = true) {
    const dialogOverlay = document.createElement('div');
    dialogOverlay.classList.add('dialog-overlay');

    const dialogBox = document.createElement('div');
    dialogBox.classList.add('dialog-box');

    const dialogMessage = document.createElement('p');
    dialogMessage.textContent = message;
    dialogBox.appendChild(dialogMessage);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    dialogBox.appendChild(buttonContainer);

    const confirmBtn = document.createElement('button');
    confirmBtn.textContent = 'OK';
    confirmBtn.classList.add('confirm-btn');
    confirmBtn.addEventListener('click', () => {
        onConfirm();
        dialogOverlay.remove(); // Remove dialog after action
    });
    buttonContainer.appendChild(confirmBtn);

    if (showCancel) {
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';
        cancelBtn.classList.add('cancel-btn');
        cancelBtn.addEventListener('click', () => {
            dialogOverlay.remove(); // Remove dialog on cancel
        });
        buttonContainer.appendChild(cancelBtn);
    }

    dialogOverlay.appendChild(dialogBox);
    document.body.appendChild(dialogOverlay);
}


// Event listener for the Add Task button
addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value; // Get the due date value

    if (taskText === '') {
        showConfirmationDialog('Please enter a task!', () => {}, false); // No "Cancel" button for simple alerts
        return; // Stop execution if no task text
    }

    if (dueDate) {
        const selectedDate = new Date(dueDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Normalize today to start of day for accurate comparison

        if (selectedDate < today) {
            showConfirmationDialog('Due date cannot be in the past!', () => {}, false);
            return; // Stop execution if due date is in the past
        }
    }

    // Add task as an object with text, dueDate, and default completed status
    addTaskToDOM({ text: taskText, dueDate: dueDate, completed: false });
    saveTasks(); // Save to local storage
    taskInput.value = ''; // Clear the input box
    dueDateInput.value = ''; // Clear the date input
});

// Event listener for pressing Enter in the task input field
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTaskBtn.click(); // Simulate a click on the add task button
    }
});

// Load tasks and set min due date when the page loads
document.addEventListener('DOMContentLoaded', () => {
    setMinDueDate();
    loadTasks();
});
