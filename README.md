# To-Do List App

---

## Project Title
To-Do List App

## Technologies
HTML, CSS, JavaScript

## Project Difficulties Level
Intermediate

## Project Description
This project aims to create a simple web-based to-do list application using HTML, CSS, and JavaScript. The objective is to provide a user-friendly interface that allows users to add, edit, and delete tasks, while also ensuring the application is responsive across various screen sizes. This project serves as a practical exercise to enhance front-end web development skills and gain experience in building interactive web applications.

---

## Requirements

### User Interface:
* A visually appealing user interface for the to-do list, designed using HTML and CSS.
* An input section for adding new tasks.
* A clear display of tasks, each with a checkbox to mark completion status.
* Options to edit and delete individual tasks.

### Functionality:
* Users can add new tasks by entering text and clicking an "Add" button.
* Each task can be marked as completed or incomplete via a checkbox.
* The application provides an option to edit the description of an existing task.
* Users can delete tasks that are no longer needed.

### Validation:
* Basic validation is implemented to prevent the addition of empty tasks.
* Errors are handled gracefully, providing clear feedback to the user.

### Local Storage:
* The to-do list data is stored in the browser's local storage using JavaScript, ensuring tasks persist even after the page is refreshed.

### Responsive Design:
* The application is fully responsive, providing an optimal user experience on both desktop and mobile devices through the use of CSS media queries.

---

## Additional Features (Optional Features Implemented):

This version of the To-Do List application includes several enhancements:

* **Due Dates**: You can add an optional due date to each task.
* **Due Date Validation**: The app prevents you from setting a due date in the past.
* **Task Filtering**: Easily switch between viewing "**All**," "**Active**," and "**Completed**" tasks.
* **Custom Confirmation Dialog**: A custom-styled modal appears for task deletion, enhancing the user experience.

---

## How to Run the Application

To get this To-Do List app up and running on your local machine, follow these simple steps:

1.  **Clone or Download the Repository:**
    * If you're using Git, clone the repository to your local machine:
        ```bash
        git clone <repository-url>
        ```
    * Alternatively, you can download the repository as a ZIP file and extract its contents.

2.  **Navigate to the Project Directory:**
    * Open your terminal or command prompt and change into the project directory:
        ```bash
        cd todo-app  # Replace 'todo-app' with the actual folder name if different
        ```

3.  **Open `index.html`:**
    * Locate the `index.html` file within the project directory.
    * Simply **double-click** on `index.html` or drag it into your web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, etc.).

That's it! The To-Do List application should now be running in your browser.

---

## Code Structure

The project is organized into three main files:

* **`index.html`**: This is the core HTML file that defines the structure and content of the To-Do List application. It includes the input fields for tasks and due dates, buttons for adding tasks and filtering, and the unordered list (`<ul>`) where tasks are displayed.

* **`style.css`**: This CSS file is responsible for the visual presentation and responsiveness of the application. It dictates the layout, colors, fonts, and ensures the UI looks good on various screen sizes, including styles for task items, buttons, and input fields.

* **`script.js`**: This JavaScript file contains all the dynamic functionality of the To-Do List. It handles:
    * Adding, editing, and deleting tasks.
    * Toggling task completion status.
    * Saving and loading tasks from **local storage** for data persistence.
    * Filtering tasks based on their status (All, Active, Completed).
    * Implementing client-side validation for due dates.
    * Creating and managing custom confirmation dialogs for a better user experience
